import express from "express";
import {
    createDepartment, getAllDepartmentsByBranchId, getAllDepartmentsByOrganizationId, getDepartmentById,
    updateDepartmentById, deleteDepartmentById, getBranchByDepartmentId, getOrganizationByDepartmentId,
    getUsersByDepartmentId, getUserDepartmentById, deleteUserDepartmentById
} from '../controllers/department.js'

export const departmentRoute = express.Router();

departmentRoute.route('/new/department').post(createDepartment)
departmentRoute.route('/departments/branch/:id').get(getAllDepartmentsByBranchId)
departmentRoute.route('/departments/organization/:id').get(getAllDepartmentsByOrganizationId)
departmentRoute.route('/department/:id').get(getDepartmentById)
departmentRoute.route('/department/update/:id').put(updateDepartmentById)
departmentRoute.route('/department/delete/:id').delete(deleteDepartmentById)
departmentRoute.route('/branch/department/:id').get(getBranchByDepartmentId)
departmentRoute.route('/organization/department/:id').get(getOrganizationByDepartmentId)
departmentRoute.route('/users/department/:id').get(getUsersByDepartmentId)
departmentRoute.route('/user/department/:id').get(getUserDepartmentById)
departmentRoute.route('/user/delete/department/:id').delete(deleteUserDepartmentById)
