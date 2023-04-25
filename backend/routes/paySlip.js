import express from 'express'
import {
    createPaySlip
} from '../controllers/paySlip.js';

export const paySlipRoute = express.Router();

paySlipRoute.route('/paySlip/new').post(createPaySlip);
