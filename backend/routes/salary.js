import express from 'express'
import { createSalary, getAllsalariesByUserID, updateSalary } from '../controllers/salary.js';

export const salaryRoute = express.Router();

salaryRoute.route('/salary/new').post(createSalary);
salaryRoute.route('/salary/:id').put(updateSalary);
salaryRoute.route('/salary/user/:id').get(getAllsalariesByUserID);