import { createNew, deleteById, getById, handleCatch, updateById } from '../utils/common.js'

import { EvaluationRatingseModel } from '../models/evaluationratingsSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'

export const createEvaluationRating = (req, res, next) => {
    try {
        if (!req.body.organization || req.body.unique_id) throw new Error( "Invalid Body.")
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error (`No such organization ${req.body.organization}`)
                req.body.ratings = req.body.ratings.replace(/\s/g, "")
                req.body.unique_id = req.body.organization + req.body.ratings.toLowerCase()
                createNew(req, res, next, EvaluationRatingseModel)
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateEvaluationRating = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error ("Request Body is empty.")
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw new Error ("Invalid Body.")
        EvaluationRatingseModel.findById(req.params.id)
            .then((response) => {
                if (!response) throw new Error ('No Such EvaluationRatings')
                req.body.ratings = req.body.ratings.replace(/\s/g, "")
                req.body.unique_id = response.organization + req.body.ratings.toLowerCase()
                updateById(req, res, next, EvaluationRatingseModel, 'EvaluationRatings')
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const deleteEvaluationRatingById = (req, res, next) => {
    deleteById(req.params.id, res, next, EvaluationRatingseModel, "EvaluationRatings")
}

export const getEvaluationRatingById = (req, res, next) => {
    getById(req.params.id, res, next, EvaluationRatingseModel, 'EvaluationRatings')
}