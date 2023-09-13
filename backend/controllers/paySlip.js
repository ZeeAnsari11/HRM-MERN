import { createNew, getAll, handleCatch, updateById } from "../utils/common.js"

import { AllowanceModel } from "../models/allowanceSchema.js";
import { AttendanceModel } from "../models/attendanceSchema.js"
import { ExpenseModel } from "../models/expenseSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { PaySlipModel } from "../models/paySlipSchema.js";
import { SalaryModel } from "../models/salarySchema.js";
import { TaxRuleModel } from "../models/taxRuleSchema.js";
import { UserModel } from "../models/userSchema.js"

let count = 0;
let resp = []
let errorOccurred = false;
export const createPaySlipsByOrganizationById = (req, res, next) => {
    try {
        if (!req.body.month || !req.body.year) throw new Error('Invalid Body.')
        let month = new Date('1900:' + req.body.month + ':01').getMonth + 1
        if (!month) throw new Error('Invalid Month.')
        PaySlipModel.find({ organization: req.params.id, month: req.body.month, year: req.body.year })
            .then((paySlip) => {
                if (paySlip.length > 0) throw new Error('Payslips of the provided month and year already exists.')
                common(req, res, next)
            })
            .catch((error) => { handleCatch(error, res, 409, next) })
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

const common = (req, res, next) => {
    count = 0;
    let userCurrentSalary;
    let userPromises = []
    let monthDateStart = new Date(req.body.year, req.body.month - 1, 1)
    let monthDateEnd = new Date(req.body.year, req.body.month, 0);
    let daysInMonth = new Date(req.body.year, req.body.month, 0).getDate();
    OrganizationModel.findById(req.params.id)
        .then((organization) => {
            if (!organization) throw new Error('No Such Organization')
            return UserModel.find({ organization: organization._id, firstUser: false })
            // return UserModel.find({ _id: "647f0a13acdf3955d82a8a44" })
                .populate({
                    path: 'leaveTypeDetails.leaveType',
                    select: ('name')
                })
        })
        .then((users) => {
            if (users.length == 0) throw new Error('No users in the provided organization')
            req.body.organization = req.params.id
            users.forEach(user => {
                let allowancePromise = AllowanceModel.find({ organization: user.organization }).exec()
                let userSalaryPromise = SalaryModel.find({ user: user._id }).sort({ createdAt: -1 }).limit(1).exec()
                let paySlipPromise = PaySlipModel.find({ user: user._id }).exec()
                let taxRulesPromise = TaxRuleModel.find({ organization: user.organization }).exec()
                let attedencesPromise = AttendanceModel.find({
                    user: user._id,
                    $or: [
                        { $and: [{ isAbsent: true }, { onLeave: "full-unpaid" }] },
                        { $and: [{ isPresent: true }, { onLeave: "short-unpaid" }] },
                        { $and: [{ isAbsent: true }, { onLeave: "not-applied" }] },
                    ],
                    date: {
                        $gte: new Date(monthDateStart.toISOString().slice(0, 10) + "T00:00:00.000+00:00"),
                        $lte: new Date(monthDateEnd.toISOString().slice(0, 10) + "T00:00:00.000+00:00")
                    }
                }).exec()
                let expensePromise = ExpenseModel.find({ organization: user.organization, user: user._id, paymentMethod: "salary", status: "approved" }).exec()

                userPromises.push(
                    Promise.all([allowancePromise, userSalaryPromise, paySlipPromise, taxRulesPromise, attedencesPromise, expensePromise])
                        .then(([allowances, userSalaries, paySlips, taxRules, attedences, expenses]) => {
                            if (taxRules.length == 0) {
                                let notFound = new Error("taxRules are not defined by the organization")
                                notFound.statusCode = 404;
                                throw notFound;
                            }
                            if (userSalaries.length == 0) {
                                userCurrentSalary = user.grossSalary
                            } else {
                                userSalaries.forEach(userSalary => {
                                    userCurrentSalary = userSalary.currentSalary
                                })
                            }
                            // console.log("==============attedences==========", attedences);
                            let { absentCost, LeaveAdjustment } = handleAbsents(userCurrentSalary, attedences, daysInMonth, user, req.body.status ? req.body.status : '')
                            // console.log("==========LeaveAdjustment================", LeaveAdjustment);
                            if (LeaveAdjustment) {
                                req.body.LeaveAdjustment = true;
                            }
                            if (expenses.length > 0) {
                                // console.log("================ok=============");
                                calculateExpenseAndUpdateExpenseRequest(expenses, req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, users.length, absentCost, req.body.status ? req.body.status : '')
                            }
                            else {
                                req.body.expenseAmount = 0
                                // console.log("================ok=========22====");
                                createPaySlip(req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, users.length, absentCost)
                            }
                        })
                        .catch((error) => {
                            if (!errorOccurred) {
                                errorOccurred = true;
                                handleCatch(error, res, error.statusCode || 500, next);
                            }
                        })
                )
            })
            return Promise.all(userPromises)
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

const calculateExpenseAndUpdateExpenseRequest = (expenses, req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, length, absentCost, status = '') => {
    // console.log("======expenses==", expenses);
    const totalAmount = expenses.reduce((sum, expense) => {
        expense.status = "paid"
        if (status == "close") {
            expense.save();
        }
        return sum + expense.amount
    }, 0);
    // console.log("======totalAmount==", totalAmount);
    req.body.expenseAmount = totalAmount
    createPaySlip(req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, length, absentCost)
}

const createPaySlip = (req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, length, value) => {
    // // console.log("======user ======", user._id);
    // console.log("=========user======", user);
    // console.log("=========userCurrentSalary======", userCurrentSalary);
    // console.log("=========allowances======", allowances);
    // console.log("=========paySlips======", paySlips);
    // console.log("=========taxRules======", taxRules);
    // console.log("=========length======", length);
    // console.log("=========value======", value);


    req.body.tax = 0
    req.body.absentCost = value
    req.body.basicSalary = req.body.grossSalary = req.body.finalSalary = userCurrentSalary
    req.body.allowance = {
        allowanceDetails: []
    }
    if (allowances.length == 0) {
        // console.log("======if===========");
        taxCalculation(req, res, next, user, userCurrentSalary, paySlips, taxRules)
        // console.log("========req.body.tax=====", req.body.tax);
        req.body.finalSalary = req.body.finalSalary - req.body.tax
        // console.log("=======req.body.finalSalary===1=", req.body.finalSalary);
        if (req.body.expenseAmount > 0) {
            req.body.finalSalary = req.body.finalSalary + req.body.expenseAmount
        }
        // console.log("=======req.body.finalSalary===2=", req.body.finalSalary);
        // console.log("========req.body.finalSalary=====", req.body.finalSalary);
        req.body.user = user._id
        PaySlipModel.create(req.body).then((response) => {
            resp.push(response)
            count = count + 1;
            if (count === length) {
                res.status(200).json({
                    success: true,
                    response: resp
                })
            }
        })
    }
    else {
        allowances.forEach(allowance => {
            // // console.log("======else===========", allowance);
            let x = {
                name: allowance.allowanceName,
                amount: user.grossSalary * (allowance.percrentageOfBaseSalary / 100)
            }
            req.body.basicSalary = req.body.basicSalary - (req.body.grossSalary * (allowance.percrentageOfBaseSalary / 100))
            req.body.allowance.allowanceDetails.push(x)
        })
        // // console.log("=====going for tax======");
        taxCalculation(req, res, next, user, userCurrentSalary, paySlips, taxRules)
        // // console.log('=======after tax======');
        // // console.log("======req.body.tax=====", req.body.tax);
        req.body.finalSalary = getCurrentMonthSalary(user, userCurrentSalary)
        // // console.log("getCurrentMonthSalary(user, userCurrentSalary)", getCurrentMonthSalary(user, userCurrentSalary));
        req.body.finalSalary = req.body.finalSalary - req.body.tax
        req.body.finalSalary = req.body.finalSalary - req.body.absentCost
        // console.log("=======req.body.finalSalary===1=", req.body.finalSalary);
        if (req.body.expenseAmount > 0) {
            req.body.finalSalary = req.body.finalSalary + req.body.expenseAmount
        }
        // console.log("=======req.body.finalSalary===2=", req.body.finalSalary);
        req.body.user = user._id
        PaySlipModel.create(req.body).then((response) => {
            resp.push(response)
            count = count + 1;
            // // console.log(count, "===", length);
            if (count === length) {
                res.status(200).json({
                    success: true,
                    response: resp
                })
            }
        })
    }
}

const taxCalculation = (req, res, next, user, userCurrentSalary, paySlips, taxRules) => {
    // // console.log("======herer=======tax=====");
    let previousFiscalTaxableEarning = calculatingPreviousFiscalTaxableEarning(req, res, next, user, userCurrentSalary, paySlips)
    // console.log("======previousFiscalTaxableEarning=======tax=====", previousFiscalTaxableEarning);
    taxRules.forEach(taxRule => {
        if (previousFiscalTaxableEarning > taxRule.fromAmount && previousFiscalTaxableEarning <= taxRule.toAmount) {
            let currentTax = currentMonthTax(req, previousFiscalTaxableEarning, taxRule, paySlips)
            // console.log("==============currentMonthTax============", currentTax);
            req.body.tax = currentTax;
            return;
        }
    })
}

const currentMonthTax = (req, previousFiscalTaxableEarning, taxRule, paySlips) => {
    // console.log("=======currentMonthTax==here=");
    // console.log("=========previousFiscalTaxableEarning===", previousFiscalTaxableEarning);
    // console.log("=========taxRule===", taxRule);
    // console.log("=========paySlips===", paySlips);


    let totalTax = 0
    if (taxRule.percentage == 0 && taxRule.fixRate == 0) {
        // // console.log("======if========");
        totalTax = 0
    }
    else if (taxRule.percentage != 0) {
        // console.log("======================11===================");
        // // console.log("3rywghbfuc", taxRule.fixRate);
        let totalSalaryIncreasesFromMinimumThreShold = previousFiscalTaxableEarning - taxRule.fromAmount
        // console.log("======================11=============totalSalaryIncreasesFromMinimumThreShold======", totalSalaryIncreasesFromMinimumThreShold);
        // // console.log("totalSalaryIncreasesFromMinimumThreShold", totalSalaryIncreasesFromMinimumThreShold);
        totalTax = taxRule.fixRate + (totalSalaryIncreasesFromMinimumThreShold * taxRule.percentage / 100)
        // console.log("======================11=============totalTax======", totalTax);
        // // console.log("======else if ======totalTax==", totalTax);
    }
    if (paySlips.length == 0) {
        // console.log("======================22===================");
        // // console.log("====== if ======totapaySlips.length == 0lTax==");
        return newJoinerTaxCase(req, totalTax)
    }
    else {
        // // console.log("======else======totapaySlips.length == 0lTax==");
        return atLeastOneSlipExistTaxCase(req, totalTax, paySlips)
    }
}

const newJoinerTaxCase = (req, totalTax) => {
    // // console.log("=====newJoinerTaxCase======here=======",);
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    // // console.log('=======financialYear==', financialYear);
    if (financialYear.monthsSinceFinancialYearStart >= 1) {
        // // console.log("=====newJoinerTaxCase======if=======");
        /// New Employee coming in month other than july
        let perMonthTax = totalTax / 12
        let taxPaidTillNow = financialYear.monthsSinceFinancialYearStart * perMonthTax
        let remainingTax = totalTax - taxPaidTillNow
        let monthlyTax = remainingTax / (financialYear.remainingMonths + 1)
        // // console.log("=======perMonthTax=====", perMonthTax);
        // // console.log("=======taxPaidTillNow=====", taxPaidTillNow);
        // // console.log("=======remainingTax=====", remainingTax);
        // // console.log("====monthlyTax==", monthlyTax);
        // console.log("======================22==========1=========", monthlyTax);

        return monthlyTax
    }
    else {
        // // console.log("=====newJoinerTaxCase======else=======");
        /// New Employee coming in july month
        let perMonthTax = totalTax / 12
        // // console.log("=====perMonthTax    else=====", perMonthTax);
        // console.log("======================22==========2=========", monthlyTax);

        return perMonthTax
    }
}

const atLeastOneSlipExistTaxCase = (req, totalTax, paySlips) => {
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    // // console.log("======>financialYear.remainingMonths", financialYear.remainingMonths);
    let foundSlipsTotalTax = 0
    let currentMonthTax = 0
    let paySlipsFromFinancialYearStarts
    let noOfPreviousMonthsTaxPaid = 0
    if (paySlips.length >= financialYear.monthsSinceFinancialYearStart) {
        // // console.log("========if=======paySlips.length >= financialYear.monthsSinceFinancialYearStart");
        paySlipsFromFinancialYearStarts = getPayObjects(req, paySlips, financialYear.monthsSinceFinancialYearStart)
        // // console.log("======-paySlipsFromFinancialYearStarts", paySlipsFromFinancialYearStarts);
        paySlipsFromFinancialYearStarts.forEach(month => {
            foundSlipsTotalTax = foundSlipsTotalTax + month.tax
        })
        // // console.log("-------foundSlipsTotalTax", foundSlipsTotalTax);
        // // console.log("financialYear.remainingMonths + 1", (financialYear.remainingMonths + 1));
        return currentMonthTax = (totalTax - foundSlipsTotalTax) / (financialYear.remainingMonths + 1)
    }
    else if (financialYear.monthsSinceFinancialYearStart > paySlips.length) {
        // // console.log("========else if=======financialYear.monthsSinceFinancialYearStart > paySlips.length");
        noOfPreviousMonthsTaxPaid = financialYear.monthsSinceFinancialYearStart - paySlips.length
        let previousSlaryTax = noOfPreviousMonthsTaxPaid * paySlips[0].tax
        paySlips.forEach(paySlip => {
            foundSlipsTotalTax = foundSlipsTotalTax + paySlip.tax
        })

        currentMonthTax = (totalTax - previousSlaryTax - foundSlipsTotalTax) / (financialYear.remainingMonths + 1)
        // // console.log("previousSlaryTax", previousSlaryTax);
        // // console.log("foundSlipsTotalTax", foundSlipsTotalTax);
        // // console.log("currentMonthTax");
        // // console.log("financialYear.remainingMonths", financialYear.remainingMonths);
        // // console.log("currentMonthTax", currentMonthTax);
        return currentMonthTax
    }
}

const calculatingPreviousFiscalTaxableEarning = (req, res, next, user, userCurrentSalary, paySlips) => {
    if (paySlips.length == 0) {
        // // console.log("going for newJoinerCase");
        return newJoinerCase(req, user, userCurrentSalary)
    }
    else return atLeastOneSlipExist(req, res, next, user, paySlips, userCurrentSalary)
}

const newJoinerCase = (req, user, userCurrentSalary) => {
    /// No PaySlip Data Found in DB. So, new Employee of the current month.
    let previousFiscalTaxableEarning = 0
    let previousMonthsSalary = 0
    let remainingMonthsSalary = 0
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    if (financialYear.monthsSinceFinancialYearStart >= 1) {
        /// New Employee coming in month other than july
        previousMonthsSalary = userCurrentSalary * financialYear.monthsSinceFinancialYearStart
        remainingMonthsSalary = userCurrentSalary * financialYear.remainingMonths
        let currentMonthSalary = getCurrentMonthSalary(user, userCurrentSalary)
        return previousFiscalTaxableEarning = previousMonthsSalary + currentMonthSalary + remainingMonthsSalary
    }
    else {
        /// New Employee coming in july month
        remainingMonthsSalary = userCurrentSalary * financialYear.remainingMonths
        let currentMonthSalary = getCurrentMonthSalary(user, userCurrentSalary)
        return previousFiscalTaxableEarning = currentMonthSalary + remainingMonthsSalary
    }
}

const atLeastOneSlipExist = (req, res, next, user, paySlips, userCurrentSalary) => {
    // // console.log("going for atLeastOneSlipExist");
    let foundSlipsTotalSalary = 0
    let previousFiscalTaxableEarning = 0
    let paySlipsFromFinancialYearStarts = 0
    let noOfPreviousMonthsSalaryRemains = 0
    let noOfAheadMonthsSalaryRemains = 0
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    if (paySlips.length >= financialYear.monthsSinceFinancialYearStart) {
        // // console.log("========paySlips.length >= financialYear.monthsSinceFinancialYearStart");
        paySlipsFromFinancialYearStarts = getPayObjects(req, paySlips, financialYear.monthsSinceFinancialYearStart)
        paySlipsFromFinancialYearStarts.forEach(month => {
            noOfPreviousMonthsSalaryRemains = noOfPreviousMonthsSalaryRemains + month.grossSalary
        })
        noOfAheadMonthsSalaryRemains = financialYear.remainingMonths * userCurrentSalary
        return previousFiscalTaxableEarning = noOfPreviousMonthsSalaryRemains + noOfAheadMonthsSalaryRemains + userCurrentSalary
    }
    else if (financialYear.monthsSinceFinancialYearStart > paySlips.length) {
        // // console.log("============financialYear.monthsSinceFinancialYearStart", financialYear.monthsSinceFinancialYearStart);
        noOfPreviousMonthsSalaryRemains = financialYear.monthsSinceFinancialYearStart - paySlips.length
        noOfAheadMonthsSalaryRemains = financialYear.remainingMonths
        let previousSlary = noOfPreviousMonthsSalaryRemains * paySlips[0].grossSalary
        let aheadSalary = noOfAheadMonthsSalaryRemains * paySlips[paySlips.length - 1].grossSalary
        paySlips.forEach(paySlip => {
            foundSlipsTotalSalary = foundSlipsTotalSalary + paySlip.grossSalary
        })
        return previousFiscalTaxableEarning = previousSlary + aheadSalary + foundSlipsTotalSalary + userCurrentSalary
    }
}

const getPayObjects = (req, paySlips, numberOfPays) => {
    const sortedPaySlips = paySlips.sort((a, b) => {
        return new Date(b.month) - new Date(a.month);
    });
    const currentMonth = req.body.month;
    const monthsSinceFinancialYearStart = currentMonth >= 6 ? currentMonth - 6 : currentMonth + 6;
    if (sortedPaySlips.length >= monthsSinceFinancialYearStart) {
        const lastNPaySlips = sortedPaySlips.slice(0, numberOfPays);
        return lastNPaySlips;
    } else {
        return [];
    }
}

const getCurrentMonthSalary = (user, userCurrentSalary) => {
    const joiningDate = new Date(user.joiningDate);
    const joiningYear = joiningDate.getFullYear();
    const joiningMonth = joiningDate.getMonth() + 1; // Add 1 to get the month number from 1 to 12
    const joiningDay = joiningDate.getDate();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // Add 1 to get the month number from 1 to 12
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    let daysWorked = 0;
    if (joiningYear === currentYear && joiningMonth === currentMonth) {
        daysWorked = daysInMonth - joiningDay + 1; // Add 1 to include the joining day
    } else {
        daysWorked = daysInMonth;
    }
    const dailySalary = userCurrentSalary / daysInMonth;
    const currentMonthSalary = daysWorked * dailySalary
    return currentMonthSalary
}

const getFinancialYearDates = (month, year) => {
    const date = new Date(year, month - 1, 1);
    const cyear = date.getFullYear();
    const monthIndex = date.getMonth();

    let financialYearStartYear = monthIndex >= 6 ? cyear : cyear - 1;
    let financialYearStartDate = new Date(financialYearStartYear, 6, 1);

    let financialYearEndDate = new Date(financialYearStartYear + 1, 5, 30);
    const financialYearStartMonthIndex = 6;
    const financialYearEndYear = financialYearEndDate.getFullYear();
    const financialYearEndMonth = financialYearEndDate.getMonth();
    const monthsSinceFinancialYearStart =
        (cyear - financialYearStartYear) * 12 + monthIndex - financialYearStartMonthIndex;
    const remainingMonths = (financialYearEndYear - cyear) * 12 + (financialYearEndMonth - monthIndex);
    return {
        start: financialYearStartDate,
        end: financialYearEndDate,
        monthsSinceFinancialYearStart: monthsSinceFinancialYearStart,
        remainingMonths: remainingMonths
    };
}

const handleAbsents = (userCurrentSalary, attedences, daysInMonth, userRef, status = "open") => {
    // console.log("========leaveTypeDetails==========", userRef.leaveTypeDetails);
    let absentCost = 0
    let perDaySalary = userCurrentSalary / daysInMonth;
    let halfDaySalary = perDaySalary / 2;
    let halfLeavesDeduction = 0;
    let fullLeavesDeduction = 0;
    let countToBeDeduct = 0;
    let LeaveAdjustment = false;
    // console.log("=======countToBeDeduct outer=======", countToBeDeduct);

    // console.log("====attedences===", attedences);
    if (attedences.length >= 1) {
        let halfDayLeaves = attedences.filter(obj => obj.onLeave === 'short-unpaid');
        // console.log("========halfDayLeaves====", halfDayLeaves.length);
        if (halfDayLeaves.length >= 1) {
            halfLeavesDeduction = halfDayLeaves.length * halfDaySalary
        }
        let fullDayLeaves = attedences.filter(obj => obj.onLeave === 'full-unpaid');
        // console.log("========fullDayLeaves====", fullDayLeaves.length);

        let not_applied = attedences.filter(obj => obj.onLeave === 'not-applied');
        countToBeDeduct = not_applied.length;
        // console.log("=========not_applied===", countToBeDeduct);
        const casualLeaveType = userRef.leaveTypeDetails.find(leave => leave.leaveType.name === 'casual');
        if (casualLeaveType && casualLeaveType.count > 0) {
            LeaveAdjustment = true;
            // console.log("=======called=========1============");
            countToBeDeduct = casualLeaveType.count - countToBeDeduct
            // console.log("=====countToBeDeduct==", countToBeDeduct);
            if (countToBeDeduct < 0) {
                // console.log("======if===============");
                casualLeaveType.count = 0;
                countToBeDeduct = Math.abs(countToBeDeduct);
                // console.log("=======countToBeDeduct==if=", countToBeDeduct);
            }
            else {
                // console.log("=============else=========");
                casualLeaveType.count = countToBeDeduct;
                countToBeDeduct = 0;
                // console.log("============countToBeDeduct==", countToBeDeduct);
            }
        }
        const annualLeaveType = userRef.leaveTypeDetails.find(leave => leave.leaveType.name === 'annual');
        if (annualLeaveType && annualLeaveType.count > 0 && countToBeDeduct > 0) {
            LeaveAdjustment = true;
            // console.log("=======called=========2============");

            // console.log("=======called=========1========s====");
            countToBeDeduct = annualLeaveType.count - countToBeDeduct
            // console.log("=====countToBeDeduct==", countToBeDeduct);
            if (countToBeDeduct < 0) {
                // console.log("======if==========s=====");
                annualLeaveType.count = 0;
                countToBeDeduct = Math.abs(countToBeDeduct);
                // console.log("=======countToBeDeduct==if=====sss===", countToBeDeduct);
            }
            else {
                // console.log("=============else=====ss====");
                annualLeaveType.count = countToBeDeduct;
                countToBeDeduct = 0;
                // console.log("============countToBeDeduct==", countToBeDeduct);
            }
        }
        if (status == "close") {
            userRef.save();
        }

        // console.log("=========countToBeDeduct==", countToBeDeduct);
        fullLeavesDeduction = (fullDayLeaves.length + countToBeDeduct) * perDaySalary
        // console.log("===========fullLeavesDeduction==", fullLeavesDeduction);
        absentCost = halfLeavesDeduction + fullLeavesDeduction
        return {
            absentCost,
            LeaveAdjustment
        }
    }
    else {
        return {
            absentCost,
            LeaveAdjustment
        }
    }
}

export const updatePaySlips = (req, res, next) => {
    try {
        if (!req.body.month || !req.body.year || !req.body.status) throw new Error('Invalid Body.')
        if (req.body.status == "open" || req.body.status == "close") {
            PaySlipModel.find({ organization: req.params.id, month: req.body.month, year: req.body.year })
                .then((paySlips) => {
                    if (paySlips.length == 0) {
                        const notFoundError = new Error('No Payslips of the provided month and year.');
                        notFoundError.statusCode = 404;
                        throw notFoundError;
                    }
                    paySlips.forEach(paySlip => {
                        if ((paySlip.status == "close" && req.body.status == "open") || (paySlip.status == "close" && req.body.status == "close")) {
                            const invalidAction = new Error('Cannot update already closed paySlips.');
                            invalidAction.statusCode = 403;
                            throw invalidAction;
                        }
                    })
                    return PaySlipModel.deleteMany({ organization: req.params.id, month: req.body.month, year: req.body.year })
                        .then((response) => {
                            // console.log("previous payslips deleted");
                            common(req, res, next);
                        })
                })
                .catch((error) => { handleCatch(error, res, error.statusCode || 500, next); })
        }
        else {
            throw new Error('Invalid Body.')
        }
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updatePaySlipsById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.updatedByAdmin || req.body.user) throw new Error('invalid body.')
        req.body.updatedByAdmin = true
        updateById(req, res, next, PaySlipModel, 'paySlip')
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getPaySlipsByUserId = (req, res, next) => {
    let query = {user:req.params.id, status:'close'}
   getAll(res, next, PaySlipModel,{user:req.params.id, status:'close'}, "PaySlips")
}