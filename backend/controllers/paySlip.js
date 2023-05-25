import { PaySlipModel } from "../models/payslipSchema.js";
import { UserModel } from "../models/userSchema.js"
import { AllowanceModel } from "../models/allowanceSchema.js";
import { createNew, updateById, handleCatch } from "../utils/common.js"
import { SalaryModel } from "../models/salarySchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { TaxRuleModel } from "../models/taxRuleSchema.js";
import { AttendanceModel } from "../models/attendanceSchema.js"

let count = 0;
let resp = []

export const createPaySlipsByOrganizationById = (req, res, next) => {
    try {
        if (!req.body.month || !req.body.year) throw 'Invalid Body.'
        let month = new Date('1900:' + req.body.month + ':01').getMonth + 1
        if (!month) throw 'Invalid Month.'
        PaySlipModel.find({ organization: req.params.id, month: req.body.month, year: req.body.year })
            .then((paySlip) => {
                if (paySlip.length > 0) throw 'Payslips of the provided month and year already exists.'
                common(req, res, next)
            })
            .catch((error) => { handleCatch(error, res, 401, next) })
    }
    catch (error) {
        handleCatch(error, res, 401, next)
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
            if (!organization) throw 'No Such Organization'
            //return UserModel.find({ organization: organization._id })
            return UserModel.find({ _id: "645cd91054f94c09815d4fbb" })
        })
        .then((users) => {
            if (users.length == 0) throw 'No users in the provided organization'
            req.body.organization = req.params.id
            users.forEach(user => {
                let allowancePromise = AllowanceModel.find({ organization: user.organization }).exec()
                let userSalaryPromise = SalaryModel.find({ user: user._id }).sort({ createdAt: -1 }).limit(1).exec()
                let paySlipPromise = PaySlipModel.find({ user: user._id }).exec()
                let taxRulesPromise = TaxRuleModel.find({organization : user.organization}).exec()
                
					let attedencesPromise = AttendanceModel.find({  
                    user: user._id,
                    $or: [
                        { $and: [{ isAbsent: true }, { onLeave: "full-unpaid" }] },
                        { $and: [{ isPresent: true }, { onLeave: "short-unpaid" }] }
                    ],
                    date: {
                        $gte: new Date(monthDateStart.toISOString().slice(0, 10) + "T00:00:00.000+00:00"),
                        $lte: new Date(monthDateEnd.toISOString().slice(0, 10) + "T00:00:00.000+00:00")
                    }
                }).exec()
                userPromises.push(
                    Promise.all([allowancePromise, userSalaryPromise, paySlipPromise, taxRulesPromise, attedencesPromise])
                        .then(([allowances, userSalaries, paySlips, taxRules, attedences]) => {
                            if (userSalaries.length == 0) {
                                userCurrentSalary = user.grossSalary
                            } else {
                                userSalaries.forEach(userSalary => {
                                    userCurrentSalary = userSalary.currentSalary
                                })
                            }
                            // console.log("==============attedences==========", attedences);
                            let value = handleAbsents(userCurrentSalary, attedences, daysInMonth)
                            createPaySlip(req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, users.length, value)
                        })
                        .catch((error) => { handleCatch(error, res, 401, next) })
                )
            })
            return Promise.all(userPromises)
        })
        .catch((error) => { handleCatch(error, res, 401, next) })
}

const createPaySlip = (req, res, next, user, userCurrentSalary, allowances, paySlips, taxRules, length, value) => {
    // console.log("======user ======", user._id);
    req.body.tax = 0
    req.body.absentCost = value
    req.body.basicSalary = req.body.grossSalary = req.body.finalSalary = userCurrentSalary
    req.body.allowance = {
        allowanceDetails: []
    }
    if (allowances.length == 0) {
        // console.log("======if===========");
        req.body.tax = taxCalculation(req, res, next, user, userCurrentSalary, paySlips, taxRules)
        req.body.finalSalary = req.body.finalSalary - req.body.tax
        createNew(req, res, next, PaySlipModel)
    }
    else {
        allowances.forEach(allowance => {
            // console.log("======else===========", allowance);
            let x = {
                name: allowance.allowanceName,
                amount: user.grossSalary * (allowance.percrentageOfBaseSalary / 100)
            }
            req.body.basicSalary = req.body.basicSalary - (req.body.grossSalary * (allowance.percrentageOfBaseSalary / 100))
            req.body.allowance.allowanceDetails.push(x)
        })
        // console.log("=====going for tax======");
        taxCalculation(req, res, next, user, userCurrentSalary, paySlips, taxRules)
        // console.log('=======after tax======');
        // console.log("======req.body.tax=====", req.body.tax);
        req.body.finalSalary = getCurrentMonthSalary(user, userCurrentSalary)
        // console.log("getCurrentMonthSalary(user, userCurrentSalary)", getCurrentMonthSalary(user, userCurrentSalary));
        req.body.finalSalary = req.body.finalSalary - req.body.tax
        req.body.finalSalary = req.body.finalSalary - req.body.absentCost
        req.body.user = user._id
        PaySlipModel.create(req.body).then((response) => {
            resp.push(response)
            count = count + 1;
            // console.log(count, "===", length);
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
    // console.log("======herer=======tax=====");
    let previousFiscalTaxableEarning = calculatingPreviousFiscalTaxableEarning(req, res, next, user, userCurrentSalary, paySlips)
    // console.log("======previousFiscalTaxableEarning=======tax=====", previousFiscalTaxableEarning);
    taxRules.forEach(taxRule => {
        if (previousFiscalTaxableEarning > taxRule.fromAmount && previousFiscalTaxableEarning <= taxRule.toAmount) {
            let currentTax = currentMonthTax(req, previousFiscalTaxableEarning, taxRule, paySlips)
            req.body.tax = currentTax;
            return;
        }
    })
}

const currentMonthTax = (req, previousFiscalTaxableEarning, taxRule, paySlips) => {
    // console.log("=======currentMonthTax==here=");
    let totalTax = 0
    if (taxRule.percentage == 0 && taxRule.fixRate == 0) {
        // console.log("======if========");
        totalTax = 0
    }
    else if (taxRule.percentage != 0) {
        // console.log("3rywghbfuc", taxRule.fixRate);
        let totalSalaryIncreasesFromMinimumThreShold = previousFiscalTaxableEarning - taxRule.fromAmount
        // console.log("totalSalaryIncreasesFromMinimumThreShold", totalSalaryIncreasesFromMinimumThreShold);
        totalTax = taxRule.fixRate + (totalSalaryIncreasesFromMinimumThreShold * taxRule.percentage / 100)
        // console.log("======else if ======totalTax==", totalTax);
    }
    if (paySlips.length == 0) {
        // console.log("====== if ======totapaySlips.length == 0lTax==");
        return newJoinerTaxCase(req, totalTax)
    }
    else {
        // console.log("======else======totapaySlips.length == 0lTax==");
        return atLeastOneSlipExistTaxCase(req, totalTax, paySlips)
    }
}

const newJoinerTaxCase = (req, totalTax) => {
    // console.log("=====newJoinerTaxCase======here=======",);
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    // console.log('=======financialYear==', financialYear);
    if (financialYear.monthsSinceFinancialYearStart >= 1) {
        // console.log("=====newJoinerTaxCase======if=======");
        /// New Employee coming in month other than july
        let perMonthTax = totalTax / 12
        let taxPaidTillNow = financialYear.monthsSinceFinancialYearStart * perMonthTax
        let remainingTax = totalTax - taxPaidTillNow
        let monthlyTax = remainingTax / (financialYear.remainingMonths + 1)
        // console.log("=======perMonthTax=====", perMonthTax);
        // console.log("=======taxPaidTillNow=====", taxPaidTillNow);
        // console.log("=======remainingTax=====", remainingTax);
        // console.log("====monthlyTax==", monthlyTax);
        return monthlyTax
    }
    else {
        // console.log("=====newJoinerTaxCase======else=======");
        /// New Employee coming in july month
        let perMonthTax = totalTax / 12
        // console.log("=====perMonthTax    else=====", perMonthTax);
        return perMonthTax
    }
}

const atLeastOneSlipExistTaxCase = (req, totalTax, paySlips) => {
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    // console.log("======>financialYear.remainingMonths", financialYear.remainingMonths);
    let foundSlipsTotalTax = 0
    let currentMonthTax = 0
    let paySlipsFromFinancialYearStarts
    let noOfPreviousMonthsTaxPaid = 0
    if (paySlips.length >= financialYear.monthsSinceFinancialYearStart) {
        // console.log("========if=======paySlips.length >= financialYear.monthsSinceFinancialYearStart");
        paySlipsFromFinancialYearStarts = getPayObjects(req, paySlips, financialYear.monthsSinceFinancialYearStart)
        // console.log("======-paySlipsFromFinancialYearStarts", paySlipsFromFinancialYearStarts);
        paySlipsFromFinancialYearStarts.forEach(month => {
            foundSlipsTotalTax = foundSlipsTotalTax + month.tax
        })
        // console.log("-------foundSlipsTotalTax", foundSlipsTotalTax);
        // console.log("financialYear.remainingMonths + 1", (financialYear.remainingMonths + 1));
        return currentMonthTax = (totalTax - foundSlipsTotalTax) / (financialYear.remainingMonths + 1)
    }
    else if (financialYear.monthsSinceFinancialYearStart > paySlips.length) {
        // console.log("========else if=======financialYear.monthsSinceFinancialYearStart > paySlips.length");
        noOfPreviousMonthsTaxPaid = financialYear.monthsSinceFinancialYearStart - paySlips.length
        let previousSlaryTax = noOfPreviousMonthsTaxPaid * paySlips[0].tax
        paySlips.forEach(paySlip => {
            foundSlipsTotalTax = foundSlipsTotalTax + paySlip.tax
        })

        currentMonthTax = (totalTax - previousSlaryTax - foundSlipsTotalTax) / (financialYear.remainingMonths + 1)
        // console.log("previousSlaryTax", previousSlaryTax);
        // console.log("foundSlipsTotalTax", foundSlipsTotalTax);
        // console.log("currentMonthTax");
        // console.log("financialYear.remainingMonths", financialYear.remainingMonths);
        // console.log("currentMonthTax", currentMonthTax);
        return currentMonthTax
    }
}

const calculatingPreviousFiscalTaxableEarning = (req, res, next, user, userCurrentSalary, paySlips) => {
    if (paySlips.length == 0) {
        // console.log("going for newJoinerCase");
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
    // console.log("going for atLeastOneSlipExist");
    let foundSlipsTotalSalary = 0
    let previousFiscalTaxableEarning = 0
    let paySlipsFromFinancialYearStarts = 0
    let noOfPreviousMonthsSalaryRemains = 0
    let noOfAheadMonthsSalaryRemains = 0
    let financialYear = getFinancialYearDates(req.body.month, req.body.year)
    if (paySlips.length >= financialYear.monthsSinceFinancialYearStart) {
        // console.log("========paySlips.length >= financialYear.monthsSinceFinancialYearStart");
        paySlipsFromFinancialYearStarts = getPayObjects(req, paySlips, financialYear.monthsSinceFinancialYearStart)
        paySlipsFromFinancialYearStarts.forEach(month => {
            noOfPreviousMonthsSalaryRemains = noOfPreviousMonthsSalaryRemains + month.grossSalary
        })
        noOfAheadMonthsSalaryRemains = financialYear.remainingMonths * userCurrentSalary
        return previousFiscalTaxableEarning = noOfPreviousMonthsSalaryRemains + noOfAheadMonthsSalaryRemains + userCurrentSalary
    }
    else if (financialYear.monthsSinceFinancialYearStart > paySlips.length) {
        // console.log("============financialYear.monthsSinceFinancialYearStart", financialYear.monthsSinceFinancialYearStart);
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

const handleAbsents = (userCurrentSalary, attedences, daysInMonth) => {
    let absentCost = 0
    // console.log("===========userCurrentSalary=============", userCurrentSalary);
    // console.log("===========daysInMonth=============", daysInMonth);
    let perDaySalary = userCurrentSalary / daysInMonth;
    let halfDaySalary = perDaySalary / 2;
    let halfLeavesDeduction = 0;
    let fullLeavesDeduction = 0;

    // console.log("====attedences===", attedences);
    if (attedences.length >= 1) {
        const halfDayLeaves = attedences.filter(obj => obj.onLeave === 'short-unpaid');
        if (halfDayLeaves.length >= 1) {
            halfLeavesDeduction = halfDayLeaves.length * halfDaySalary
        }
        fullLeavesDeduction = (attedences.length - halfDayLeaves.length) * perDaySalary
        return absentCost = halfLeavesDeduction + fullLeavesDeduction

        // absentCost = attedences.length * calculatePerUserSalary(daysInMonth, userCurrentSalary)
        // return absentCost
    }
    else return absentCost
}

const calculatePerUserSalary = (daysInMonth, userCurrentSalary) => {
    return userCurrentSalary / daysInMonth
}

export const updatePaySlips = (req, res, next) => {
    try {
        if (req.body.updatedByAdmin && !req.body.month && !req.body.year && !req.body.status && (req.body.status != "open" || req.body.status != "close")) throw 'Invalid Body.'
        PaySlipModel.find({ organization: req.params.id, month: req.body.month, year: req.body.year })
            .then((paySlips) => {
                if (paySlips.length == 0) throw 'No Payslips of the provided month and year.'
                if (req.body.status == "open") {
                    paySlips.forEach(paySlip => {
                        if (paySlip.status != "open") throw 'Cannot update closed paySlips.'
                    })
                    return PaySlipModel.deleteMany({ organization: req.params.id })
                        .then((response) => {
                            // console.log("previous payslips deleted");
                            common(req, res, next);
                        });
                }
                else {
                    paySlips.forEach(paySlip => {
                        if (paySlip.status != "open") throw 'Cannot update closed paySlips.'
                        paySlip.status = "close"
                        paySlip.save()
                    })
                    res.status(200).json({
                        success: true
                    })
                }
            })
            .catch((error) => { handleCatch(error, res, 401, next) })
    } catch (error) {
        handleCatch(error, res, 401, next)
    }
}

export const updatePaySlipsById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.updatedByAdmin || req.body.user) throw 'invalid body.'
        req.body.updatedByAdmin = true
        updateById(req, res, next, PaySlipModel, 'paySlip')
    }
    catch (error) {
        handleCatch(error, res, 401, next)
    }
}
