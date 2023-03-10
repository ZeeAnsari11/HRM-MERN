import express from 'express'
import { createUserRole, deleteUserRole, getAllUserRolesByOrganizationID, updateUserRole } from '../controllers/userRole.js';

export const userRoleRoute = express.Router();

userRoleRoute.route('/userRole/new').post(createUserRole);
userRoleRoute.route('/userRole/:id').put(updateUserRole).delete(deleteUserRole);
userRoleRoute.route('/userRole/organization/:id').get(getAllUserRolesByOrganizationID);