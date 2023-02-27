import express from 'express';
import { createExperience, deleteExperienceById, deleteExperiences, getAllExperiencesByUserID, updateExperiences } from '../controllers/experience.js';

export const experienceRoute = express.Router();

experienceRoute.route('/experience/create/new').post(createExperience);
experienceRoute.route('/experience/:id').delete(deleteExperienceById).put(updateExperiences);
experienceRoute.route('/experience/user/:id')
.get(getAllExperiencesByUserID)
.delete(deleteExperiences)
