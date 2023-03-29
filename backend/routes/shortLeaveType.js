import express from 'express'
import {
    createShortLeaveType, updateShortLeaveTypeById, getShortLeaveType, deleteShortLeaveType,
    getAllShortLeaveTypeByOrganization
} from '../controllers/shortLeaveType.js';


export const shortLeaveTypeRoute = express.Router();

shortLeaveTypeRoute.route('/short-leave/new').post(createShortLeaveType)
shortLeaveTypeRoute.route('/short-leave/update/:id').put(updateShortLeaveTypeById)
shortLeaveTypeRoute.route('/short-leave/organization/:id').get(getAllShortLeaveTypeByOrganization)
shortLeaveTypeRoute.route('/short-leave/:id').get(getShortLeaveType)
shortLeaveTypeRoute.route('/short-leave/delete/:id').delete(deleteShortLeaveType)

