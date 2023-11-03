import {
    creatingWFH,
    deleteWFH,
    getAllWFHByOrgId,
    getAllWFHByUserId,
    getWFH,
    rejectLeaveRequest,
    updateWFH
} from '../controllers/wfh.js'

import express from "express";

export const wfhRoute = express.Router();

wfhRoute.route('/wfh/new').post(creatingWFH)
wfhRoute.route('/wfh/delete/:id').delete(deleteWFH)
wfhRoute.route('/wfh/update/:id').put(updateWFH)
wfhRoute.route('/wfh/:id').get(getWFH)
wfhRoute.route('/wfh/user/:id').get(getAllWFHByUserId)
wfhRoute.route('/wfh/reject/:id').get(rejectLeaveRequest)
wfhRoute.route('/wfh/org/:id').get(getAllWFHByOrgId)
