import express from 'express';
import {updateAssetRevisionById} from '../controllers/assetsRevisions.js';
export const assetRevisionRoute = express.Router();

assetRevisionRoute.route('/assets-revision/:id').put(updateAssetRevisionById);

