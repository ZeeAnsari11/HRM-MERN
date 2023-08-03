import {
    createEmploymentType,
    deleteEmploymentTypeById,
    getAllEmploymentTypesFromOrganizationId,
    getEmploymentTypeById,
    updateEmploymentTypeById
} from '../controllers/employmentType.js'

import express from "express";

export const employmentTypeRoute = express.Router();

employmentTypeRoute.route('/employmentType/new').post(createEmploymentType)
employmentTypeRoute.route('/employmentType/:id').put(updateEmploymentTypeById).delete(deleteEmploymentTypeById).get(getEmploymentTypeById)
employmentTypeRoute.route('/employmentType/all/:id').get(getAllEmploymentTypesFromOrganizationId)