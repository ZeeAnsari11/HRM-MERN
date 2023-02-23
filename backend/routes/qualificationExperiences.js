import express from 'express'
import { createQualification, deleteQualificationById, getQualificationById, updateQualificationById } from '../controllers/qualificationExperiences.js';


const qualificationExperiences = express.Router();

qualificationExperiences.route('/qualification/create/new').post(createQualification);
qualificationExperiences.route('/qualification/:id').get(getQualificationById).delete(deleteQualificationById).put(updateQualificationById);


export { qualificationExperiences };