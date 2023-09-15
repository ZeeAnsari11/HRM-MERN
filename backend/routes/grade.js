import {
    createGrade,
    deleteGradeById,
    getAllGrades,
    getGradeById,
    updateGrade,
} from '../controllers/grade.js';

import express from 'express'

export const gradeRoute = express.Router();

gradeRoute.route('/grade/new').post(createGrade);
gradeRoute.route('/grade/organization/:id').get(getAllGrades);
gradeRoute.route('/grade/:id').get(getGradeById).delete(deleteGradeById).put(updateGrade);;