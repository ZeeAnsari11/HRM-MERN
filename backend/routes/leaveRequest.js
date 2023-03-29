import express from 'express'
import {
    createNewLeaveRequest,
} from '../controllers/leaveRequest.js';


export const leaveRequestRoute = express.Router();

leaveRequestRoute.route('/leave-request/new').post(createNewLeaveRequest)

