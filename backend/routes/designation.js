import { createDesignation, deleteAllDesignationsByOrgId, deleteDesiginationById, getAllDesignationsByOrgId, getDesignationById, updateDesignationById } from '../controllers/designation.js';

import express from 'express'

export const designationRoute = express.Router();

designationRoute.route('/designation/new').post(createDesignation);
designationRoute.route('/designation/:id').get(getDesignationById).put(updateDesignationById).delete(deleteDesiginationById);
// designationRoute.route('/designations/creator/:id').get(getDesignationsBycreatorId);
designationRoute.route('/designations/organization/:id').get(getAllDesignationsByOrgId).delete(deleteAllDesignationsByOrgId);



