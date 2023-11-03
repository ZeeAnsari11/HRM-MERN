import {
    GetUserAllowedLeaves,
    addingLeaveRequest,
    deleteLeaveRequest,
    getLeaveRequest,
    getLeaveRequestsByOrgId,
    rejectLeaveRequest,
    updateLeaveRequest,
    userLeaveRequests
} from '../controllers/leaveRequest.js';

import express from 'express'

export const leaveRequestRoute = express.Router();

leaveRequestRoute.route('/leave-request/new').post(addingLeaveRequest)
leaveRequestRoute.route('/leave-request/update/:id').put(updateLeaveRequest)
leaveRequestRoute.route('/leave-request/reject/:id').get(rejectLeaveRequest)
leaveRequestRoute.route('/leave-request/:id').get(getLeaveRequest)
leaveRequestRoute.route('/leave-request/delete/:id').delete(deleteLeaveRequest)
leaveRequestRoute.route('/leave-request/user-leaves/:id').get(userLeaveRequests)
leaveRequestRoute.route('/leaves/user/:id').get(GetUserAllowedLeaves)
leaveRequestRoute.route('/leaves/org/:id').get(getLeaveRequestsByOrgId)

