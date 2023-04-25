import express from 'express'
import {
    addingLeaveRequest, updateLeaveRequest, getLeaveRequest, deleteLeaveRequest, userLeaveRequests
} from '../controllers/leaveRequest.js';


export const leaveRequestRoute = express.Router();

leaveRequestRoute.route('/leave-request/new').post(addingLeaveRequest)
leaveRequestRoute.route('/leave-request/update/:id').put(updateLeaveRequest)
leaveRequestRoute.route('/leave-request/:id').get(getLeaveRequest)
leaveRequestRoute.route('/leave-request/delete/:id').delete(deleteLeaveRequest)
leaveRequestRoute.route('/leave-request/user-leaves/:id').get(userLeaveRequests)
