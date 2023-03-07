import express from 'express'
import { createDesignation, getDesignationById, updateDesignationById, getDesignationsBycreatorId, getAllDesignationsByOrgId, deleteAllDesignationsByOrgId} from '../controllers/designation.js';

export const designationRoute = express.Router();

designationRoute.route('/designation/new').post(createDesignation);
designationRoute.route('/designation/:id').get(getDesignationById).put(updateDesignationById);
designationRoute.route('/designations/creator/:id').get(getDesignationsBycreatorId);
designationRoute.route('/designations/organization/:id').get(getAllDesignationsByOrgId).delete(deleteAllDesignationsByOrgId);