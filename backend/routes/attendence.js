import express from 'express';
import { createAttendence, markAbsent, filterAttendence,updateAttendence} from '../controllers/attendence.js';
export const attendenceRoute = express.Router();

attendenceRoute.route('/attendence/new').post(createAttendence)
attendenceRoute.route('/attendence/mark-absent').post(markAbsent)
attendenceRoute.route('/filter-attendence').get(filterAttendence)
attendenceRoute.route('/update-attendence').put(updateAttendence)


