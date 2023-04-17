import express from 'express'
import { requestToNextNode } from '../utils/request.js';

export const requestRoute = express.Router();

requestRoute.route('/request/nextNode').get(requestToNextNode);