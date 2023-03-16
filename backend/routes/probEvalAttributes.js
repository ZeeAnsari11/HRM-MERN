import express from 'express'
import { createProbEvalAttribute, updateProbEvalAttribute, deleteProbEvalAttribute } from '../controllers/probEvalAttributes.js';

export const probEvalAttributesRoute = express.Router();

probEvalAttributesRoute.route('/prob-eval/attribute/new').post(createProbEvalAttribute);
probEvalAttributesRoute.route('/prob-eval/attribute/:id').put(updateProbEvalAttribute).delete(deleteProbEvalAttribute);