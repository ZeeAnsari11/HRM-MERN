import express from "express";
import { createDepartment, getAllDepartmentsByBranchId, getAllDepartmentsByOrganizationId, getDepartmentById,
    updateDepartmentNameById, deleteDepartmentById, getBranchByDepartmentId } from '../controllers/department.js'

const router = express.Router();
router.route('/new/department').post(createDepartment)
router.route('/getAllDepartmentsByBranchId/:id').get(getAllDepartmentsByBranchId)
router.route('/getAllDepartmentsByOrganizationId/:id').get(getAllDepartmentsByOrganizationId)
router.route('/getDepartmentById/:id').get(getDepartmentById)
router.route('/updateDepartmentNameById/:id').put(updateDepartmentNameById)
router.route('/deleteDepartmentById/:id').delete(deleteDepartmentById)
router.route('/getBranchByDepartmentId/:id').get(getBranchByDepartmentId)

export default router;