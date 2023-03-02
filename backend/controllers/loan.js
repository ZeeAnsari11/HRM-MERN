import { LoanModel } from "../models/loanSchema.js"
import { LoanTypeModel } from "../models/loanTypeSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"
import { UserModel } from "../models/userSchema.js"
import { createNew } from "../utils/common.js"

export const createLoan = (req, res, next) => {
    let loans = []
    UserModel.find({ _id: req.body.user, organization: req.body.organization })
        .then((response) => {
            if (response.length == 0) throw 'User And Organization Does Not Belog To Each Other'
            LoanTypeModel.find({ organization: req.body.organization })
                .then((loanTypes) => {
                    if (loanTypes.length == 0) throw 'This organization Does Not Have Any Type Of Loan'
                    loanTypes.forEach((loan) => loans.push(loan.type));
                    console.log("========loans===",loans);
                    if (!loans.includes(req.body.loan_type.toUpperCase())) throw "Organization is not Offering Your Required Loan"
                    createNew(req, res, next, LoanModel, 'Loan')
                })
                .catch((err) => {
                    res.status(401).json({
                        success: false,
                        error: err
                    })
                })
        })
        .catch((err) => {
            res.status(401).json({
                success: false,
                error: err
            })
        })
}