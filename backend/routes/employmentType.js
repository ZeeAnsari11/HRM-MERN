import express from "express";
import {
    createEmploymentType, updateEmploymentTypeById, deleteEmploymentTypeById,
    getEmploymentTypeById,
    getAllEmploymentTypesFromOrganizationId
} from '../controllers/employmentType.js'

export const employmentTypeRoute = express.Router();

employmentTypeRoute.route('/employmentType/new').post(createEmploymentType)
employmentTypeRoute.route('/employmentType/update/:id').put(updateEmploymentTypeById)
employmentTypeRoute.route('/employmentType/delete/:id').delete(deleteEmploymentTypeById)
employmentTypeRoute.route('/employmentType/:id').get(getEmploymentTypeById)
employmentTypeRoute.route('/employmentType/all/:id').get(getAllEmploymentTypesFromOrganizationId)