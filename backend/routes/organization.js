import express from 'express'
import { createOrganization , getAllOrganizations, getOrganizationById, deleteOrganizationById, updateOrganizationById} from '../controllers/organization.js';


const organizationRoute = express.Router();

organizationRoute.route('/organization/new').post(createOrganization);
organizationRoute.route('/organizations').get(getAllOrganizations);
organizationRoute.route('/organization/:id').get(getOrganizationById).delete(deleteOrganizationById).put(updateOrganizationById);


export {organizationRoute};