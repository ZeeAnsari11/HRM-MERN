import { LoanModel } from "../models/loanSchema.js"
import { LoanTypeModel } from "../models/loanTypeSchema.js"
import { LoanRepaymentModel } from "../models/loanRepaymentSchema.js"
import { UserModel } from "../models/userSchema.js"
import { creatingRequest } from "../utils/request.js"
import { handleCatch, updateById } from "../utils/common.js"
import { RequestFlowModel } from "../models/requestFlowSchema.js"
import mongoose from "mongoose"

export const createLoan = (req, res, next) => {
    try {
        let loanType;
        let user;
        if (req.body.status) { throw new Error("Loan status is not required") }
        LoanTypeModel.find({ _id: req.body.loan_type, organization: req.body.organization })
            .then((loanTypes) => {
                if (loanTypes.length == 0) throw new Error('The Loan You are applying for is not offered by the Oranization')
                loanType = loanTypes[0];
                UserModel.find({ _id: req.body.user, organization: req.body.organization }).select("_id lineManager organization branch firstName lastName designation")
                    .then((users) => {
                        if (users.length == 0) throw new Error('User And Organization Does Not Belog To Each Other')
                        user = users[0];
                        if (!loanType.designations.includes(user.designation)) throw new Error("Your Designation is not allowed for applying this loan")
                        if (new Date(req.body.required_Date) < Date.now()) throw new Error("Your can not Request Loan in Past Date")
                        if (!req.body.repaymentSchedules || req.body.repaymentSchedules.length == 0) throw new Error("Please create the repayment schedule")
                        createRepaymentSchedules(req, res, next, user)
                    })
                    .catch((err) => {
                        handleCatch(err, res, 400, next)
                    })
            })
            .catch((err) => {
                handleCatch(err, res, 403, next)
            })
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

const createRepaymentSchedules = (req, res, next, user) => {
    try {
        let ids = [];
        let index = 0;
        req.body.repaymentSchedules.forEach(schedule => {
            if (schedule.rePaymentDate <= req.body.required_Date) { throw new Error("You canot schedule the rePaymentDate before the loan required date") }
            LoanRepaymentModel.create(schedule)
                .then((loanRepayment) => {
                    index++;
                    ids.push(loanRepayment._id);
                    if (index == req.body.repaymentSchedules.length) {
                        req.body.repaymentSchedules = ids;
                        mongoose.startSession().then((session) => {
                            session.startTransaction();
                            LoanModel.create([req.body], { session: session })
                                .then((newLoan) => {
                                    let loan = newLoan[0];
                                    return RequestFlowModel.find({ name: "Loan Flow" }).populate({
                                        path: "requestType",
                                        match: {
                                            organization: user.organization,
                                        },
                                    })
                                        .then((flows) => {
                                            let flow = flows.filter(flow => flow.requestType != null)
                                            if (flow.length == 0) {
                                                throw new Error("There is no flow defined for this type of request by organization.");
                                            } else {
                                                return Promise.resolve(flow[0]);
                                            }
                                        })
                                        .then((flow) => {
                                            creatingRequest(req, res, next, user, loan, flow._id, flow.requestType._id, "Loan");
                                            session.commitTransaction()
                                        })
                                        .catch((err) => {
                                            session.endSession();
                                            handleCatch(err, res, 400, next);
                                        });
                                })
                        })
                            .catch((err) => handleCatch(err, res, 500, next));
                    }
                })
                .catch((err) => handleCatch(err, res, 500, next));
        })
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const getLoanById = (req, res, next) => {
    LoanModel.findById(req.params.id).populate('repaymentSchedules')
        .then((loan) => {
            if (!loan) throw new Error("Loan not found")
            res.status(200).json({
                success: true,
                loan
            })
        })
        .catch((err) => handleCatch(err, res, 404, next))
}

export const deleteLoanById = (req, res, next) => {
    LoanModel.findById(req.params.id)
        .then((loan) => {
            if (!loan) {
                const notFoundError = new Error("Loan not found");
                notFoundError.statusCode = 404;
                throw notFoundError;
            }
            if (loan.status !== "pending") {
                const forbiddenError = new Error("You cannot delete an approved or rejected loan request");
                forbiddenError.statusCode = 423;
                throw forbiddenError;
            }

            loan.remove()
                .then(() => {
                    res.status(200).json({
                        success: true,
                        message: `Loan Request Deleted Successfully`
                    });
                })
                .catch((err) => handleCatch(err, res, 500, next));
        })
        .catch((err) => {
            handleCatch(err, res, err.statusCode || 500, next);
        });
};


export const filterLoans = (req, res, next) => {
    try {
        if (!req.query.organization) throw new Error("Organization not specified");
        if (req.query.status && Object.keys(req.query).length == 2) {
            req.query.status = (req.query.status).toLowerCase()
            if (req.query.status == "pending" || req.query.status == "approved" || req.query.status == "rejected") {
                LoanModel.find(req.query)
                    .then((loans) => {
                        if (loans.length == 0) throw new Error("No such loans/organization found")
                        res.status(200).json({
                            success: true,
                            count: loans.length,
                            data: loans
                        })
                    })
                    .catch(err => handleCatch(err, res, 404, next))
            }
            else { throw new Error(`You can only filter on the basis of "pending" "approved" or "rejected`) }
        }
        else {
            throw new Error("Please Specifiy the filter type too and you can only filter on the basis of Loan Status")
        }
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const updateLoanById = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status) throw new Error('You can not update the organization, and user of loan')
        if (new Date(req.body.required_Date) < Date.now()) throw new Error("Your can not Request Loan in Past Date")
        if (req.body.repaymentSchedules) throw new Error("You can not update the repayment schedule here")
        LoanModel.findById(req.params.id)
            .then((loan) => {
                if (!loan) {
                    const notFoundError = new Error("Loan not found");
                    notFoundError.statusCode = 404;
                    throw notFoundError;
                }
                if (loan.status !== "pending") {
                    const forbiddenError = new Error("You cannot Updated an approved or rejected loan request");
                    forbiddenError.statusCode = 423;
                    throw forbiddenError;
                }
                updateById(req, res, next, LoanModel, "Loan")
            })
            .catch((err) => {
                handleCatch(err, res, err.statusCode || 500, next);
            });
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

export const getAllLoansByUserId = (req, res, next) => {
    LoanModel.find({ user: req.params.id }).populate({
        path: 'loan_type',
        select: 'type'
    })
        .populate('repaymentSchedules')
        .then((loans) => {
            if (loans.length == 0) throw new Error('No loan requests found against that user')
            res.status(200).json({
                success: true,
                loans
            })
        })
        .catch(err => handleCatch(err, res, 404, next));
}

// need to remove this as it should not call by route this functionality is getting done by using request flows it automatically change the status of loan request
export const chanegeLoanStatus = (new_Status, loanId) => {
    try {
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
        else throw new Error('Rquest status can only be "pending"/ "approved" / "rejected"')
    }
    catch (err) { handleCatch(err, res, 400, next); }
}

export const LoanApproved = () => {
    console.log("========= Your Loan is Approved=======");
}