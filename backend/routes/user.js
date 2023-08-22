import {
    addNewLeavesToUsers,
    addSkillsToUser,
    addingUser,
    deleteSkillFromUser,
    deleteUserById,
    filterUserByOrganizationId,
    getAllUsersByBranchId,
    getAllUsersByOrganizationId,
    getAttendanceExemptUsers,
    getChildsByUserId,
    getEmployeeTypeByOrganizationId,
    getHODByDepartmentId,
    getLineManagerByuserId,
    getRoleTypeByOrganizationId,
    getUserById,
    getUserLeaveQuota,
    selectUserBG_Shifter,
    updateProfilePicture,
    updateUserById,
    updateUserEmployment,
    validateUserToken
} from '../controllers/user.js'

import express from "express";

export const userRoute = express.Router();

userRoute.route('/user/new').post(validateUserToken, addingUser)
userRoute.route('/user/organization/:id').get(getAllUsersByOrganizationId)
userRoute.route('/user/branch/:id').get(getAllUsersByBranchId)
userRoute.route('/user/update/:id').put(validateUserToken, updateUserById)
userRoute.route('/user/delete/:id').delete(deleteUserById)
userRoute.route('/user/employment/update/:id').put(updateUserEmployment)
userRoute.route('/user/skill/:id').post(validateUserToken, addSkillsToUser).delete(deleteSkillFromUser)
userRoute.route('/user/lineManager/:id').get(getLineManagerByuserId)
userRoute.route('/user/filter-user/organization').post(filterUserByOrganizationId)
userRoute.route('/user/lineManager/:id').get(getLineManagerByuserId)
userRoute.route('/user/hod/:id').get(getHODByDepartmentId)
userRoute.route('/exempt/user/organization/:id').get(getAttendanceExemptUsers)
userRoute.route('/user/type/organization/:id').get(getEmployeeTypeByOrganizationId)
userRoute.route('/user/role/type/organization/:id').get(getRoleTypeByOrganizationId)
userRoute.route('/user/:id').get(getUserById)
userRoute.route('/user/chart/my-chart/:id').get(getChildsByUserId);
userRoute.route('/user/newLeaves/:id').put(addNewLeavesToUsers);
userRoute.route('/user/leave-quota/:id').get(getUserLeaveQuota);
userRoute.route('/user/edit-profile/:id').put(updateProfilePicture);
userRoute.route('/bg-shifter/user/:id').put(selectUserBG_Shifter)
