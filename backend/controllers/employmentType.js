import { EmploymentModel } from '../models/employmentSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { createNew, deleteById, updateById, getById, handleCatch } from '../utils/common.js'

export const createEmploymentType = (req, res, next) => {
    try {
        if (!req.body.organization || req.body.unique_id) throw new Error ("Invalid Body.")
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error (`No such organization ${req.body.organization}`)
                req.body.employmentType = req.body.employmentType?.replace(/\s/g, "")
                req.body.unique_id = req.body.organization + req.body.employmentType?.toLowerCase()
                createNew(req, res, next, EmploymentModel)
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateEmploymentTypeById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error ("Request Body is empty.")
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw new Error ("Invalid Body.")
        if (req.body.employmentType) {
            EmploymentModel.findById(req.params.id)
                .then((response) => {
                    if (!response) throw new Error ('No Such EmploymentType')
                    req.body.employmentType = req.body.employmentType.replace(/\s/g, "")
                    req.body.unique_id = response.organization + req.body.employmentType.toLowerCase()
                    updateById(req, res, next, EmploymentModel, 'EmploymentType')
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        } else updateById(req, res, next, EmploymentModel, 'EmploymentType')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const deleteEmploymentTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, EmploymentModel, "EmploymentType")
}

export const getEmploymentTypeById = (req, res, next) => {
    getById(req.params.id, res, next, EmploymentModel, 'EmploymentType')
}