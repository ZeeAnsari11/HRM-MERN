import express from 'express';
export const qualificationRoute = express.Router();

qualificationRoute.route('/assets-revision/new').post(createAssetRevision);
qualificationRoute.route('/assets-revision/:id').put(updateAssetRevisionById);

