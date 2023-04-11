import express from 'express'
import { 
    createProbationEvaluation, 
    deleteProbationEvaluation, 
    getProbationEvaluationById, 
    getProbationEvaluationsByUserId,
    updateProbationEvaluation, 
    updateProbationEvaluationAdmin
} from '../controllers/probationEvaluation.js';


export const probationEvaluationRoute = express.Router();

probationEvaluationRoute.post('/probationEvaluation/create', createProbationEvaluation);

// get all 
probationEvaluationRoute.get('/probationEvaluation/all/:id', getProbationEvaluationsByUserId);

//get based on id
probationEvaluationRoute.get('/probationEvaluation/:id', getProbationEvaluationById);

// UPDATE based on id
probationEvaluationRoute.put('/probationEvaluation/admin/update/:id', updateProbationEvaluationAdmin);

probationEvaluationRoute.put('/probationEvaluation/update/:id', updateProbationEvaluation);
// DELETE based on id
probationEvaluationRoute.delete('/probationEvaluation/delete/:id', deleteProbationEvaluation);