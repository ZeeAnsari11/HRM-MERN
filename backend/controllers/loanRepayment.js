import { LoanRepaymentModel } from "../models/loanRepaymentSchema.js"
import { deleteById, handleCatch, updateById } from "../utils/common.js"
import { LoanModel } from "../models/loanSchema.js";


export const deleteLoanRepaymentScheduleById = (req, res, next) => {
    deleteById(req.params.id, res, next, LoanRepaymentModel, "Loan repayment schedule")
};

export const updateLoanRepaymentScheduleById = (req, res, next) => {
    LoanModel.findOne(
        { repaymentSchedules: req.params.id, status: 'pending' })
        .then((loan) => {
            if (!loan) throw new Error ("You can not update the schedule of an approved or rejected loan")
            updateById(req, res, next, LoanRepaymentModel);
        })
        .catch(err => handleCatch(err, res, 423, next))
}