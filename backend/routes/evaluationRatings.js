import express from "express";
import {
    createEvaluationRating, updateEvaluationRating, deleteEvaluationRatingById, getEvaluationRatingById
} from '../controllers/evaluationRatings.js'

export const evaluationRatingRoute = express.Router();

evaluationRatingRoute.route('/evaluationRating/new').post(createEvaluationRating)
evaluationRatingRoute.route('/evaluationRating/update/:id').put(updateEvaluationRating)
evaluationRatingRoute.route('/evaluationRating/delete/:id').delete(deleteEvaluationRatingById)
evaluationRatingRoute.route('/evaluationRating/:id').get(getEvaluationRatingById)