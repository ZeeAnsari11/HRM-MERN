import { LoanTypeModel } from "../models/loanTypeSchema.js";
import { DesignationModel } from '../models/designationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { deleteInBulk, getAll, deleteById, updateById, createNew, getById, handleCatch } from "../utils/common.js";

export const createLoanType = (req, res, next) => {
    try {
        let count = 0;
        let skip = false;
        if (req.body.designations.length <= 0 || !req.body.designations) throw new Error("List of designations must be specified for loan type creation")
        else {
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
                            throw new Error("Designation Is Not In Your Organization");
                        }
                        else {
                            if (count == designations.length) {
                                createNew(req, res, next, LoanTypeModel)
                            }
                        }
                    })
                    .catch((err) => {
                        handleCatch(err, res, 404, next)
                    })
            });
        }
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

export const deleteLoanTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, LoanTypeModel, "LoanType")
}

export const getAllLoanTypesByUserDesignation = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw new Error("User not found")
            if (!user.isActive) throw new Error("User is not active")
            LoanTypeModel.find({ designations: { $elemMatch: { $eq: user.designation } }, organization: user.organization })
                .then((loanTypes) => {
                    if (loanTypes.length == 0) throw new Error("There is not loan type available for usre's designation or organization might be wrong")
                    res.status(200).json({
                        success: true,
                        count: loanTypes.length,
                        Date: loanTypes
                    })
                })
                .catch(err => handleCatch(err, res, 404, next))
        })
        .catch(err => handleCatch(err, res, 404, next))
}

export const UpdateLoanTypeById = (req, res, next) => {
    console.log("================1================");
    try {
        if (req.body.organization) {
            throw new Error('Cannot Update the Organization')
        }
        if (req.body.designations.length === 0) {
            throw new Error("Please select at least 1 designation.");
        }
        LoanTypeModel.findById(req.params.id)
            .then((loanType) => {
                if (!loanType) throw new Error("LoanType not found")
                let DbDesignations = req.body.designations || [];
                let notExistDesignations = []
                let count = 0
                req.body.designations.forEach((designationId) => {
                    DesignationModel.find({ _id: designationId, organization: loanType.organization })
                        .then((designation) => {
                            count++;
                            console.log("================4================", count);

                            if (designation.length == 0) notExistDesignations.push(designationId);
                            else {
                                if (!DbDesignations.includes(designationId)) {
                                    DbDesignations.push(designationId);
                                }
                            }
                            if (req.body.designations.length == count) {
                                loanType.designations = DbDesignations;
                                loanType.type = req.body.type
                                console.log("=======loanType=====", loanType);
                                loanType.save()
                                    .then((response) => {
                                        if (!response) {
                                            throw new Error(`LoanType Not Updated Successfully`);
                                        }
                                        res.status(200).json({
                                            success: true,
                                            Message: `Updated Successfully`,
                                            NotFoundDesignations: `Designation(s) not found ${notExistDesignations}`
                                        })
                                    })
                                    .catch((err) => {
                                        handleCatch(err, res, 500, next)
                                    })
                            }
                        })
                        .catch((err) => {
                            handleCatch(err, res, 500, next)
                        })
                })
            })
            .catch((err) => {
                handleCatch(err, res, 500, next)
            })
    }

    catch (error) {
        handleCatch(error, res, 400, next)
    }

}

export const getAllLoanTypeByOrgId = (req, res, next) => {
    getAll(res, next, LoanTypeModel, { organization: req.params.id }, "Loan Type")
}

export const deleteAllLoanTypeByOrgId = (orgId) => {
    LoanTypeModel.deleteMany({ organization: orgId })
        .then(() => {
            console.log("=========deleted successfully")
            process.exit(0);
        })
        .catch((error) => handleCatch(error, res, 401, next))
}

export const getLoanTypeById = (req, res, next) => {
    getById(req.params.id, res, next, LoanTypeModel, "Loan Type");
}