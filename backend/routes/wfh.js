import express from "express";
import {
    creatingWFH, getWFH, deleteWFH, updateWFH, rejectLeaveRequest
} from '../controllers/wfh.js'

export const wfhRoute = express.Router();

wfhRoute.route('/wfh/new').post(creatingWFH)
wfhRoute.route('/wfh/delete/:id').delete(deleteWFH)
wfhRoute.route('/wfh/update/:id').put(updateWFH)
wfhRoute.route('/wfh/:id').get(getWFH)
wfhRoute.route('/wfh/reject/:id').get(rejectLeaveRequest)