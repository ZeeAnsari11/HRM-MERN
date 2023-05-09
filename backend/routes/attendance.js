import express from 'express';
import { createAttendance, markAbsent, filterAttendance, updateAttendance} from '../controllers/attendance.js';
export const attendenceRoute = express.Router();

attendenceRoute.route('/attendence/new').post(createAttendance)
attendenceRoute.route('/attendence/mark-absent').post(markAbsent)
attendenceRoute.route('/filter-attendence').post(filterAttendance)
// attendenceRoute.route('/update-attendence').put(updateAttendance)


