import { ShortLeaveTypeModel } from "../models/shortLeaveTypeSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js"
import { createNew, handleCatch, updateById, getById, getAll, deleteById } from '../utils/common.js'

export const createShortLeaveType = (req, res, next) => {
    try {
        if (!req.body.organization || !req.body.name) throw new Error  ('Invalid Body')
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error (`No such organization ${req.body.organization}`)
                req.body.unique_id = req.body.organization + req.body.name.replace(/\s/g, "").toLowerCase()
                createNew(req, res, next, ShortLeaveTypeModel)
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateShortLeaveTypeById = (req, res, next) => {
    try {
        if (req.body.organization) throw new Error ('Invalid Body')
        if (req.body.name) {
            ShortLeaveTypeModel.findById(req.params.id)
                .then((shortLeaveType) => {
                    if (!shortLeaveType) throw new Error (`No such short leave type ${req.params.id}`)
                    req.body.unique_id = shortLeaveType.organization + req.body.name.replace(/\s/g, "").toLowerCase()
                    updateById(req, res, next, ShortLeaveTypeModel, 'Short Leave Type')
                })
        }
        else updateById(req, res, next, ShortLeaveTypeModel, 'Short Leave Type')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getAllShortLeaveTypeByOrganization = (req, res, next) => {
    getAll(res, next, ShortLeaveTypeModel, { organization: req.params.id }, 'Short Leave Type')
}

export const getShortLeaveType = (req, res, next) => {
    getById(req.params.id, res, next, ShortLeaveTypeModel, 'Short Leave Type')
}

export const deleteShortLeaveType = (req, res, next) => {
    deleteById(req.params.id, res, next, ShortLeaveTypeModel, 'Short Leave Type')
}

