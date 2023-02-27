import express from 'express'
import { createRelative, deleteRelativeById, deleteRelativeByUserId, getAllRelativesByUserId, updateRelative } from '../controllers/relatives.js';

export const relativesRoute = express.Router();

relativesRoute.route('/relative/new').post(createRelative);
relativesRoute.route('/relative/:id').delete(deleteRelativeById).put(updateRelative);
relativesRoute.route('/relatives/user/:id')
.get(getAllRelativesByUserId)
.delete(deleteRelativeByUserId);