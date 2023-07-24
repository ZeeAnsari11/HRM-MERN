import {
    createDepartment,
    deleteDepartmentById,
    deleteUserDepartmentById,
    getAllDepartmentsByBranchId,
    getAllDepartmentsByOrganizationId,
    getBranchByDepartmentId,
    getDepartmentById,
    getOrganizationByDepartmentId,
    getUserDepartmentById,
    getUsersByDepartmentId,
    updateDepartmentById
} from '../controllers/department.js'

import express from "express";

export const departmentRoute = express.Router();

departmentRoute.route('/new/department').post(createDepartment)
departmentRoute.route('/departments/branch/:id').get(getAllDepartmentsByBranchId)
departmentRoute.route('/departments/organization/:id').get(getAllDepartmentsByOrganizationId)
departmentRoute.route('/department/:id').get(getDepartmentById)
departmentRoute.route('/department/:id').put(updateDepartmentById)
departmentRoute.route('/department/:id').delete(deleteDepartmentById)
departmentRoute.route('/branch/department/:id').get(getBranchByDepartmentId)
departmentRoute.route('/organization/department/:id').get(getOrganizationByDepartmentId)
departmentRoute.route('/users/department/:id').get(getUsersByDepartmentId)
departmentRoute.route('/user/department/:id').get(getUserDepartmentById)
departmentRoute.route('/user/delete/department/:id').delete(deleteUserDepartmentById)
