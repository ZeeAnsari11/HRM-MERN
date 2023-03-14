import { EOETypeModel } from '../models/eoeTypeSchema.js'
import { createNew, deleteById, updateById, getById } from '../utils/common.js'

export const creatEOEType = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (!req.body.organization) throw "Provide Organization."
        if (req.body.eoeType !== undefined) {
            createNew(req, res, next, EOETypeModel)
        }
        else throw "invalid body"
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const updateEOETypeById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty."
        if (req.body.organization) throw "Cannot Update Organization."
        if (req.body.eoeType !== undefined) {
            updateById(req, res, next, EOETypeModel);
        }
        else throw "invalid body"
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const deleteEOETypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, EOETypeModel, "eoeType")
}

export const getEOETypeById = (req, res, next) => {
    getById(req.params.id, res, next, EOETypeModel, 'eoeType')
}