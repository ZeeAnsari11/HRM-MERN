import express from 'express'
import { getAllSalariesByUserID, updateSalary } from '../controllers/salary.js';

export const salaryRoute = express.Router();

salaryRoute.route('/salary/update/:id').put(updateSalary);
salaryRoute.route('/salary/user/:id').get(getAllSalariesByUserID);