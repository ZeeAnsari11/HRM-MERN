import { LoanModel } from "../models/loanSchema.js"
import { LoanTypeModel } from "../models/loanTypeSchema.js"
import { LoanRepaymentModel } from "../models/loanRepaymentSchema.js"
import { UserModel } from "../models/userSchema.js"
import { handleCatch, updateById, getAll } from "../utils/common.js"
import { creatingRequest } from "../utils/request.js"

export const createLoan = (req, res, next) => {
    try {
        let loanType;
        let user;

        if (req.body.status) { throw "Loan status is not required" }
        LoanTypeModel.find({ _id: req.body.loan_type, organization: req.body.organization })
            .then((loanTypes) => {
                if (loanTypes.length == 0) throw 'The Loan You are applying for is not offered by the Oranization'
                loanType = loanTypes[0];
                UserModel.find({ _id: req.body.user, organization: req.body.organization }).select("_id lineManager organization branch firstName lastName designation")
                    .then((users) => {
                        if (users.length == 0) throw 'User And Organization Does Not Belog To Each Other'
                        user = users[0];
                        if (!loanType.designations.includes(user.designation)) throw "Your Designation is not allowed for applying this loan"
                        if (new Date(req.body.required_Date) < Date.now()) throw "Your can not Request Loan in Past Date"
                        if (!req.body.repaymentSchedules || req.body.repaymentSchedules.length == 0) throw "Please create the repayment schedule"
                        createRepaymentSchedules(req, res, next, user)
                    })
                    .catch((err) => {
                        handleCatch(err, res, 401, next)
                    })
            })
            .catch((err) => {
                handleCatch(err, res, 401, next)
            })
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

const createRepaymentSchedules = (req, res, next, user) => {
    let ids = [];
    let index = 0;
    req.body.repaymentSchedules.forEach(schedule => {
        if (schedule.rePaymentDate <= req.body.required_Date) { throw "You canot schedule the rePaymentDate before the loan required date" }
        LoanRepaymentModel.create(schedule)
            .then((loanRepayment) => {
                index++;
                ids.push(loanRepayment._id);
                if (index == req.body.repaymentSchedules.length) {
                    req.body.repaymentSchedules = ids;
                    LoanModel.create(req.body)
                        .then((loan) => {
                            creatingRequest(req, res, next, user, loan, "6458b0acf54c3eb58e8bfad8", "6458b00ef54c3eb58e8bfad4", "Loan")
                            res.status(200).json({
                                success: true,
                                message: "Your Rquest for Loan created successfully"
                            })
                        })
                        .catch(err => handleCatch(err, res, 401, next))
                }
            })
            .catch((err) => handleCatch(err, res, 401, next));
    });
}

export const getLoanById = (req, res, next) => {
    LoanModel.findById(req.params.id).populate('repaymentSchedules')
        .then((loan) => {
            res.status(200).json({
                success: true,
                loan
            })
        })
        .catch((err) => handleCatch(err, res, 401, next))
}

export const deleteLoanById = (req, res, next) => {
    LoanModel.findById(req.params.id)
        .then((loan) => {
            if (!loan) throw "Loan not found"
            if (loan.status !== "pending") { throw "You can not delete an approved or rejected loan Request" }
            loan.remove()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        Message: `Loan Request Deleted Successfully`
                    })
                })
        })
        .catch((err) => handleCatch(err, res, 401, next))
}

export const filterLoans = (req, res, next) => {
    try {
        if (!req.query.organization) throw "Organization not specified";
        if (req.query.status && Object.keys(req.query).length == 2) {
            req.query.status = (req.query.status).toLowerCase()
            if (req.query.status == "pending" || req.query.status == "approved" || req.query.status == "rejected") {
                LoanModel.find(req.query)
                    .then((loans) => {
                        if (loans.length == 0) throw "No such loans/organization found"
                        res.status(200).json({
                            success: true,
                            count: loans.length,
                            data: loans
                        })
                    })
                    .catch(err => handleCatch(err, res, 401, next))
            }
            else { throw `You can only filter on the basis of "pending" "approved" or "rejected` }
        }
        else {
            throw "Please Specifiy the filter type too and you can only filter on the basis of Loan Status"
        }
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const updateLoanById = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status) throw 'You can not update the organization, and user of loan'
        if (new Date(req.body.required_Date) < Date.now()) throw "Your can not Request Loan in Past Date"
        if (req.body.repaymentSchedules) throw "You can not update the repayment schedule here"
        LoanModel.findById(req.params.id)
            .then((loan) => {
                if (!loan) throw "Loan not found"
                if (loan.status !== "pending") throw "You can not Update an approved or rejected loan Request"
                updateById(req, res, next, LoanModel, "Loan")
            })
            .catch(err => handleCatch(err, res, 401, next))
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err
        })
    }
}

export const getAllLoansByUserId = (req, res, next) => {
    getAll(res, next, LoanModel, { user: req.params.id }, "Loan");
}

export const chanegeLoanStatus = (new_Status, loanId) => {
    new_Status = new_Status.toLowerCase();
    if (new_Status.status == "pending" || new_Status == "approved" || new_Status == "rejected") {
        LoanModel.updateOne({ _id: loanId }, { status: new_Status })
            .then((response) => {
                res.status(200).json({
                    success: true,
                    data: response
                })
            })
            .catch((err) => handleCatch(err, res, 401, next))
    }
}

export const LoanApproved = () => {
console.log("========= Your Loan is Approved=======");
}