import express from 'express'
import {
    createPaySlipsByOrganizationById
} from '../controllers/paySlip.js';

export const paySlipRoute = express.Router();

paySlipRoute.route('/paySlip/new/:id').post(createPaySlipsByOrganizationById);
