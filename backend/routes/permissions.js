import express from 'express';
import { updatePermissions, getPermissionsByOrganizationId } from '../controllers/permissions.js';

export const PermssionsRoute = express.Router();
PermssionsRoute.route('/permissions/setting').put(updatePermissions)
PermssionsRoute.route("/permissions/organization/:id").get(getPermissionsByOrganizationId) 