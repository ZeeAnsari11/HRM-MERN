import {
    changeLeaveStatusById,
    createNewLeaveType,
    filterLeaveTypes,
    getLeaveTypeById,
    getLeaveTypeByOrgId,
    updateLeaveTypeById
} from '../controllers/leaveType.js';

import express from 'express'

export const leaveTypeRoute = express.Router();

leaveTypeRoute.route('/leaveType/new').post(createNewLeaveType)
leaveTypeRoute.route('/leaveType/updateStatus/:id').put(changeLeaveStatusById)
leaveTypeRoute.route('/leaveType/:id').put(updateLeaveTypeById).get(getLeaveTypeById)
leaveTypeRoute.route('/leaveTypes/filter').get(filterLeaveTypes)
leaveTypeRoute.route('/leave-types/organization/:id').get(getLeaveTypeByOrgId)