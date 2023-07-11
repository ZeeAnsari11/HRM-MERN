import express from 'express'
import {
    createPaySlipsByOrganizationById, getPaySlipsByUserId, updatePaySlips, updatePaySlipsById
} from '../controllers/paySlip.js';

export const paySlipRoute = express.Router();

paySlipRoute.route('/paySlip/new/:id').post(createPaySlipsByOrganizationById);
paySlipRoute.route('/paySlips/update/:id').put(updatePaySlips);
paySlipRoute.route('/paySlip/update/:id').put(updatePaySlipsById);
paySlipRoute.route('/paySlip/user/:id').get(getPaySlipsByUserId);