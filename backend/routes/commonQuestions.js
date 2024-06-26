import express from 'express'
import {
    createCommnQuestion, updateCommnQuestionById, deleteCommnQuestionById, getCommnQuestionById,
    getCommnQuestionByOrganizationId
} from '../controllers/commonQuestions.js';

export const commonQuestionsRoute = express.Router();

commonQuestionsRoute.route('/commn_question/new').post(createCommnQuestion)
commonQuestionsRoute.route('/commn_question/update/:id').put(updateCommnQuestionById)
commonQuestionsRoute.route('/commn_question/delete/:id').delete(deleteCommnQuestionById)
commonQuestionsRoute.route('/commn_question/:id').get(getCommnQuestionById)
commonQuestionsRoute.route('/commn_questions/organization/:id').get(getCommnQuestionByOrganizationId)

