import { EmploymentModel } from '../models/employmentSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { createNew, deleteById, updateById, getById, getAll, handleCatch } from '../utils/common.js'

export const createEmploymentType = (req, res, next) => {
    try {
        if (!req.body.organization || req.body.unique_id) throw "Invalid Body."
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw `No such organization ${req.body.organization}`
                req.body.employmentType = req.body.employmentType?.replace(/\s/g, "")
                req.body.unique_id = req.body.organization + req.body.employmentType?.toLowerCase()
                createNew(req, res, next, EmploymentModel)
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}
export const getAllEmploymentTypesFromOrganizationId = (req, res, next) => {
    getAll(res, next, EmploymentModel, {organization: req.params.id} , 'Employment TYpes')
}
export const updateEmploymentTypeById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw "Invalid Body."
        if (req.body.employmentType) {
            EmploymentModel.findById(req.params.id)
                .then((response) => {
                    if (!response) throw 'No Such EmploymentType'
                    req.body.employmentType = req.body.employmentType.replace(/\s/g, "")
                    req.body.unique_id = response.organization + req.body.employmentType.toLowerCase()
                    updateById(req, res, next, EmploymentModel, 'EmploymentType')
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        } else updateById(req, res, next, EmploymentModel, 'EmploymentType')
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const deleteEmploymentTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, EmploymentModel, "EmploymentType")
}

export const getEmploymentTypeById = (req, res, next) => {
    getById(req.params.id, res, next, EmploymentModel, 'EmploymentType')
}