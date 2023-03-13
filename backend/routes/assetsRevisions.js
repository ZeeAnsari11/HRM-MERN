import express from 'express';
export const qualificationRoute = express.Router();
import {updateAssetRevisionById } from '../controllers/assetsRevisions';

qualificationRoute.route('/assets-revision/:id').put(updateAssetRevisionById);

