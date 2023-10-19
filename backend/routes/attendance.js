import { createAttendance, filterAttendance, markAbsent, updateAttendance } from '../controllers/attendance.js';

import express from 'express';
export const attendenceRoute = express.Router();

attendenceRoute.route('/attendence/new').post(createAttendance)
attendenceRoute.route('/attendence/mark-absent').post(markAbsent)
attendenceRoute.route('/filter-attendence').post(filterAttendance)
// attendenceRoute.route('/update-attendence').put(updateAttendance)


