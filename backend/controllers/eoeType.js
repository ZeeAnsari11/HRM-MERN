import { EOETypeModel } from '../models/eoeTypeSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { createNew, deleteById, updateById, getById, handleCatch } from '../utils/common.js'

export const creatEOEType = (req, res, next) => {
    try {
        if (!req.body.organization || req.body.unique_id) throw new Error ("Invalid Body.")
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error (`No such organization ${req.body.organization}`)
                req.body.eoeType = req.body.eoeType?.replace(/\s/g, "")
                req.body.unique_id = req.body.organization + req.body.eoeType?.toLowerCase()
                createNew(req, res, next, EOETypeModel)
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateEOETypeById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error ("Request Body is empty.")
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw new Error ("Invalid Body.")
        if (req.body.eoeType) {
            EOETypeModel.findById(req.params.id)
                .then((response) => {
                    if (!response) throw new Error ('No Such EOEType')
                    req.body.eoeType = req.body.eoeType.replace(/\s/g, "")
                    req.body.unique_id = response.organization + req.body.eoeType.toLowerCase()
                    updateById(req, res, next, EOETypeModel, 'eoeType')
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        } else updateById(req, res, next, EOETypeModel, 'eoeType')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const deleteEOETypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, EOETypeModel, "eoeType")
}

export const getEOETypeById = (req, res, next) => {
    getById(req.params.id, res, next, EOETypeModel, 'eoeType')
}