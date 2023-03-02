import express from 'express'
import { createDesignation, getDesignationById, updateDesignationById, getDesignationsByUserId, getAllDesignationsByOrgId, deleteAllDesignationsByOrgId} from '../controllers/designation.js';

export const designationRoute = express.Router();

designationRoute.route('/designation/new').post(createDesignation);
designationRoute.route('/designation/:id').get(getDesignationById).put(updateDesignationById);
designationRoute.route('/designations/user/:id').get(getDesignationsByUserId);
designationRoute.route('/designations/organization/:id').get(getAllDesignationsByOrgId).delete(deleteAllDesignationsByOrgId);



