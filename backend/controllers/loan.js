import { LoanModel } from "../models/loanSchema.js"
import { LoanTypeModel } from "../models/loanTypeSchema.js"
import { UserModel } from "../models/userSchema.js"
import { createNew, deleteById, getById, handleCatch, updateById, getAll} from "../utils/common.js"

export const createLoan = (req, res, next) => {
    let loanType;
    let user;
    LoanTypeModel.find({ _id: req.body.loan_type, organization: req.body.organization })
        .then((loanTypes) => {
            if (loanTypes.length == 0) throw 'The Loan You are applying for is not offered by the Oranization'
            loanType = loanTypes[0];
            UserModel.find({ _id: req.body.user, organization: req.body.organization })
                .then((users) => {
                    if (users.length == 0) throw 'User And Organization Does Not Belog To Each Other'
                    user = users[0];
                    if (!loanType.designations.includes(user.designation)) throw "Your Designation is not allowed for applying this loan"
                    if (new Date(req.body.required_Date) < Date.now()) throw "Your can not Request Loan in Past Date"
                    createNew(req, res, next, LoanModel);
                })
                .catch((err) => {
                    handleCatch(err, res, 401, next)
                })
        })
        .catch((err) => {
            handleCatch(err, res, 401, next)
        })
}

export const getLoanById = (req, res, next) => {
    getById(req.params.id, res, next, LoanModel, "Loan")
}

export const deleteLoanById = (req, res, next) => {
    deleteById(req.params.id, res, next, LoanModel, "Loan")
}

export const updateLoanById = (req, res, next) => {
    const inject = () => {
        if (req.body.user || req.body.organization) throw 'You can not update the organization and user of loan'
        if (new Date(req.body.required_Date) < Date.now()) throw "Your can not Request Loan in Past Date"
    }
    try {

        updateById(req, res, next, LoanModel, "Loan", inject)
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err
        })
    }
}

export const getAllLoansByUserId = (req, res, next) => {
    getAll(res,next, LoanModel, {user: req.params.id}, "Loan");
}