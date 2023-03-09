import { EmploymentModel } from '../models/employmentSchema.js'
import { createNew, deleteById, updateById, getById } from '../utils/common.js'

export const createEmploymentType = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (!req.body.organization) throw "Provide Organization."
        if (req.body.employmentType !== undefined) {
            createNew(req, res, next, EmploymentModel)
        }
        else throw "invalid body"
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const updateEmploymentTypeById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (req.body.organization) throw "Cannot Update Organization."
        if (req.body.employmentType !== undefined) {
            updateById(req, res, next, EmploymentModel);
        }
        else throw "invalid body"
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const deleteEmploymentTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, EmploymentModel, "EmploymentType")
}

export const getEmploymentTypeById = (req, res, next) => {
    getById(req.params.id, res, next, EmploymentModel, 'EmploymentType')
}