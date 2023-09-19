import {
checkForgetPDuplicates,
createPaySlipsByOrganizationById,
getPaySlipsByUserId,
getPayslipsByOrgId,
updatePaySlips,
updatePaySlipsById
} from '../controllers/paySlip.js';

import express from 'express'

export const paySlipRoute = express.Router();

paySlipRoute.route('/paySlip/new/:id').post(checkForgetPDuplicates, createPaySlipsByOrganizationById);
paySlipRoute.route('/paySlips/update/:id').put(updatePaySlips);
paySlipRoute.route('/paySlip/update/:id').put(updatePaySlipsById);
paySlipRoute.route('/paySlip/user/:id').get(getPaySlipsByUserId);
paySlipRoute.route('/paySlip/organization/:id').get(getPayslipsByOrgId,);
