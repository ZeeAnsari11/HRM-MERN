import express from 'express';
import { createQualification, deleteAllQualifications, deleteQualificationById, getAllQualificationsByUserID, updateQualification } from '../controllers/qualification.js';

export const qualificationRoute = express.Router();

qualificationRoute.route('/qualification/new').post(createQualification);
qualificationRoute.route('/qualification/:id').delete(deleteQualificationById).put(updateQualification);
qualificationRoute.route('/qualification/user/:id').get(getAllQualificationsByUserID).delete(deleteAllQualifications)
