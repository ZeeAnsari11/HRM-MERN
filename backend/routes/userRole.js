import express from 'express'
import { createUserRole, getAllUserRolesByOrganizationId, updateUserRoleById, getUserRoleById} from '../controllers/userRole.js';

export const userRoleRoute = express.Router();

userRoleRoute.route('/user-role/new').post(createUserRole);
userRoleRoute.route('/user-role/:id').put(updateUserRoleById).get(getUserRoleById);
userRoleRoute.route('/user-role/organization/:id').get(getAllUserRolesByOrganizationId);