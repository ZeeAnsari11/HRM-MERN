import { createMissingPunchRequest, deleteMissingPunchRequest, filterMissingPunches, getMissingPunchRequest, updateMissingPunchRequest } from '../controllers/missingPunches.js';

import express from 'express'

export const missingPunchesRequestRoute = express.Router();

missingPunchesRequestRoute.route('/missing-punch/new').post(createMissingPunchRequest);
missingPunchesRequestRoute.route('/missing-punch/user/filter').get(filterMissingPunches);
missingPunchesRequestRoute.route('/missing-punch/:id').get(getMissingPunchRequest).delete(deleteMissingPunchRequest).put(updateMissingPunchRequest);
