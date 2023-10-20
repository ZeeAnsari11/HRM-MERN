import { getListOfRequestsByLMAndRFT, rejectRequest, requestToNextNode } from '../utils/request.js';

import express from 'express'

export const requestRoute = express.Router();

// getListOfRequestsByLMAndRFT    (LMAndRFT ) Line Manager and Request Flow Type

requestRoute.route('/request/nextNode').post(requestToNextNode);
requestRoute.route('/request-reject').post(rejectRequest);
requestRoute.route('/requests').get(getListOfRequestsByLMAndRFT);

