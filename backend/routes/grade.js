import {
    createGrade,
    deleteGradeById,
    getAllGrades,
    getGradeById,
    updateGrade,
} from '../controllers/grade.js';

import express from 'express'
import { permissionsMiddlewre } from '../middlewares/permissions.js';

export const gradeRoute = express.Router();

// gradeRoute.use(permissionsMiddlewre);

gradeRoute.route('/grade/new').post(createGrade);
gradeRoute.route('/grade/organization/:id').get(getAllGrades);
gradeRoute.route('/grade/:id').get(getGradeById).delete(deleteGradeById).put(updateGrade);;