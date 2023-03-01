import { LoanTypeModel } from "../models/loanTypeSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js"
import { checkIsExistAndCreate, deleteInBulk, getAll, deleteById, updateById } from "../utils/common.js";

export const createLoanType = (req, res, next) => {
    checkIsExistAndCreate(req, res, next, req.body.organization, OrganizationModel, LoanTypeModel, 'Organization')
}

export const deleteLoanTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, LoanTypeModel, "Loan Type")
}
export const UpdateLoanTypeById = (req, res, next) => {
    updateById(req, res, next, LoanTypeModel, "Loan Type")
}

export const getAllLoanTypeByOrgId = (req, res, next) => {
    getAll(res, next, LoanTypeModel, { organization: req.params.id }, "Loan Type")
}
export const deleteAllLoanTypeByOrgId = (req, res, next) => {
    deleteInBulk(res, next, LoanTypeModel, {organization : req.params.id}, "Loan Type")
}
