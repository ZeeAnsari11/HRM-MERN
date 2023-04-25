import { AllowanceModel } from "../models/allowanceSchema.js";
import { OrganizationModel } from '../models/organizationSchema.js'
import { createNew, deleteById, updateById, getById, handleCatch, getAll } from '../utils/common.js'

export const createAllowance = (req, res, next) => {
    try {
        if (!req.body.organization || req.body.unique_id) throw "Invalid Body."
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw `No such organization ${req.body.organization}`
                req.body.unique_id = req.body.organization + req.body.allowanceName?.replace(/\s/g, "").toLowerCase()
                createNew(req, res, next, AllowanceModel)
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const updateAllowanceById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw "Invalid Body."
        if (req.body.allowanceName) {
            AllowanceModel.findById(req.params.id)
                .then((response) => {
                    if (!response) throw 'No Such Allowance'
                    req.body.allowanceName = req.body.allowanceName.replace(/\s/g, "")
                    req.body.unique_id = response.organization + req.body.allowanceName.toLowerCase()
                    updateById(req, res, next, AllowanceModel, 'Allowance')
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        } else updateById(req, res, next, AllowanceModel, 'Allowance')
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const deleteAllowanceById = (req, res, next) => {
    deleteById(req.params.id, res, next, AllowanceModel, 'Allowance')
}

export const getAllowanceById = (req, res, next) => {
    getById(req.params.id, res, next, AllowanceModel, 'Allowance')
}

export const getAllAllowanceByOrganization = (req, res, next) => {
    getAll(res, next, AllowanceModel, { organization: req.params.id }, 'Allowance')
}
