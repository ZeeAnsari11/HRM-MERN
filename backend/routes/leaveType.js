import express from 'express'
import {
    createNewLeaveType, changeLeaveStatusById, getLeaveTypeById, updateLeaveTypeById,
    filterLeaveTypes
} from '../controllers/leaveType.js';


export const leaveTypeRoute = express.Router();

leaveTypeRoute.route('/leaveType/new').post(createNewLeaveType)
leaveTypeRoute.route('/leaveType/updateStatus/:id').put(changeLeaveStatusById)
leaveTypeRoute.route('/leaveType/update/:id').put(updateLeaveTypeById)
leaveTypeRoute.route('/leaveType/:id').get(getLeaveTypeById)
leaveTypeRoute.route('/leaveTypes/filter').get(filterLeaveTypes)
