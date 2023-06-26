import express from 'express'
import { createMissingPunchRequest, getMissingPunchRequest, deleteMissingPunchRequest, updateMissingPunchRequest, filterMissingPunches} from '../controllers/missingPunches.js';
export const missingPunchesRequestRoute = express.Router();

missingPunchesRequestRoute.route('/missing-punch/new').post(createMissingPunchRequest);
missingPunchesRequestRoute.route('/missing-punch/user/filter').get(filterMissingPunches);
missingPunchesRequestRoute.route('/missing-punch/:id').get(getMissingPunchRequest).delete(deleteMissingPunchRequest).put(updateMissingPunchRequest);
