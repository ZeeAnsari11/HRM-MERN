import express from "express";
import {
    createUser, getAllUsersByOrganizationId, getAllUsersByBranchId, updateUserById,
    deleteUserById, getUserById, updateUserEmployment, addSkillsToUser, deleteSkillFromUser, 
    getActiveNonActiveUsersByOrganizationId, getLineManagerByuserId, getHODByDepartmentId,
    getAttendanceExemptUsers, getEmployeeTypeByOrganizationId, getRoleTypeByOrganizationId

} from '../controllers/user.js'

export const userRoute = express.Router();

userRoute.route('/user/new').post(createUser)
userRoute.route('/user/organization/:id').get(getAllUsersByOrganizationId)
userRoute.route('/user/branch/:id').get(getAllUsersByBranchId)
userRoute.route('/user/update/:id').put(updateUserById)
userRoute.route('/user/delete/:id').delete(deleteUserById)
userRoute.route('/user/:id').get(getUserById)
userRoute.route('/user/employment/update/:id').put(updateUserEmployment)
userRoute.route('/user/skill/:id').post(addSkillsToUser).delete(deleteSkillFromUser)
userRoute.route('/user/lineManager/:id').get(getLineManagerByuserId)
userRoute.route('/user/active/organization/:id').get(getActiveNonActiveUsersByOrganizationId)
userRoute.route('/user/lineManager/:id').get(getLineManagerByuserId)
userRoute.route('/user/hod/:id').get(getHODByDepartmentId)
userRoute.route('/exempt/user/organization/:id').get(getAttendanceExemptUsers)
userRoute.route('/user/type/organization/:id').get(getEmployeeTypeByOrganizationId)
userRoute.route('/user/role/type/organization/:id').get(getRoleTypeByOrganizationId)

