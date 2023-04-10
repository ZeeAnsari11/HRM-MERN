import { LoanRepaymentModel } from "../models/loanRepaymentSchema.js"
import { handleCatch, updateById } from "../utils/common.js"
import { LoanModel } from "../models/loanSchema.js";


export const deleteLoanRepaymentScheduleById = (req, res, next) => {
    LoanRepaymentModel.findById(req.params.id)
        .then((loanRepayment) => {
            if (!loanRepayment) {
                handleCatch(err, res, 401, next)
            }
            loanRepayment.remove()
                .then(() => {
                    res.status(200).json(
                        {
                            message: "Loan repayment schedule deleted successfully."
                        });
                })
                .catch((err) => handleCatch(err, res, 401, next));
        })
        .catch((err) => handleCatch(err, res, 401, next));
};

export const updateLoanRepaymentScheduleById = (req, res, next) => {
    LoanModel.findOne(
        { repaymentSchedules: req.params.id, status: 'pending' })
        .then((loan) => {
            if (!loan) throw "You can not update the schedule of an approved or rejected loan"
            updateById(req, res, next, LoanRepaymentModel);
        })
        .catch(err => handleCatch(err, res, 410, next))
}