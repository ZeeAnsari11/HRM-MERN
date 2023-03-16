import express from 'express';
export const assetRevisionRoute = express.Router();
import {updateAssetRevisionById } from '../controllers/assetsRevisions.js';

assetRevisionRoute.route('/assets-revision/:id').put(updateAssetRevisionById);

