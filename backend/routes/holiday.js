import express from 'express'
import {
    createCompanyHoliday
} from '../controllers/holiday.js';


export const holidayRoute = express.Router();

holidayRoute.route('/holiday/new/:id').post(createCompanyHoliday)
