import { LoanTypeModel } from "../models/loanTypeSchema.js";
import { DesignationModel } from '../models/designationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { deleteInBulk, getAll, deleteById, updateById, createNew, getById, handleCatch } from "../utils/common.js";

export const createLoanType = (req, res, next) => {
    let count = 0;
    let skip = false;
    let designations = req.body.designations;
    designations.forEach(designation => {
        DesignationModel.find({ _id: designation, organization: req.body.organization })
            .then((response) => {
                if (skip) {
                    return;
                }
                count++;
                if (response.length == 0) {
                    skip = true;
                    throw "Designation Is Not In Your Organization";
                }
                else {
                    if (count == designations.length) {
                        createNew(req, res, next, LoanTypeModel)
                    }
                }
            })
            .catch((err) => {
                res.status(401).json({
                    success: false,
                    error: err
                })
            })
    });
}

export const deleteLoanTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, LoanTypeModel, "LoanType")
}

export const getAllLoanTypesByUserDesignation = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw "User not found"
            if (!user.isActive) throw "User is not active"
            LoanTypeModel.find({ designations: { $elemMatch: { $eq : user.designation } }, organization: user.organization })
                .then((loanTypes) => {
                    if(loanTypes.length == 0) throw "There is not loan type available for usre's designation or organization might be wrong"
                    res.status(200).json({
                        success: true,
                        count : loanTypes.length,
                        Date: loanTypes
                    })
                })
                .catch(err => handleCatch(err, res, 401, next))
        })
        .catch(err => handleCatch(err, res, 401, next))
}

export const UpdateLoanTypeById = (req, res, next) => {
    try {
        if (req.body.organization) {
            throw 'Cannot Update the Organization'
        }
        if (!req.body.designations) {
            updateById(req, res, next, DepartmentModel);
        }
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
    if (req.body.designations) {
        LoanTypeModel.findById(req.params.id)
            .then((loanType) => {
                if (!loanType) throw "LoanType not found"
                let DbDesignations = loanType.designations || [];
                let notExistDesignations = []
                let count = 0
                req.body.designations.forEach((designationId) => {
                    DesignationModel.find({ _id: designationId, organization: loanType.organization })
                        .then((designation) => {
                            count++;
                            if (designation.length == 0) notExistDesignations.push(designationId);
                            else {
                                if (!DbDesignations.includes(designationId)) {
                                    DbDesignations.push(designationId);
                                }
                            }
                            if (req.body.designations.length == count) {
                                loanType.designations = DbDesignations;
                                loanType.save()
                                    .then((response) => {
                                        if (!response) {
                                            throw (`LoanType Not Updated Successfully`);
                                        }
                                        res.status(200).json({
                                            success: true,
                                            Message: `Updated Successfully`,
                                            NotFoundDesignations: `Designation(s) not found ${notExistDesignations}`
                                        })
                                    })
                                    .catch((err) => {
                                        handleCatch(err, res, 401, next)
                                    })
                            }
                        })
                        .catch((err) => {
                            handleCatch(err, res, 401, next)
                        })
                })
            })
            .catch((err) => {
                handleCatch(err, res, 401, next)
            })
    }
}

export const getAllLoanTypeByOrgId = (req, res, next) => {
    getAll(res, next, LoanTypeModel, { organization: req.params.id }, "Loan Type")
}

export const deleteAllLoanTypeByOrgId = (req, res, next) => {
    deleteInBulk(res, next, LoanTypeModel, { organization: req.params.id }, "Loan Type")
}

export const getLoanTypeById = (req, res, next) => {
    getById(req.params.id, res, next, LoanTypeModel, "Loan Type");
}