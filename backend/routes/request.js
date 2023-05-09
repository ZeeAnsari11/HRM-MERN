import express from 'express'
import { requestToNextNode, rejectRequest} from '../utils/request.js';

export const requestRoute = express.Router();

requestRoute.route('/request/nextNode').post(requestToNextNode);
requestRoute.route('/request-reject').post(rejectRequest);
