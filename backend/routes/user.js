import express from "express";
import {
    createUser, getAllUsersByOrganizationId, getAllUsersByBranchId, updateUserById,
    deleteUserById, getUserById, updateUserEmployment, getAllActiveUsersByOrganizationId,
    getAllNonActiveUsersByOrganizationId, getLineManagerByuserId
} from '../controllers/user.js'

export const userRoute = express.Router();

userRoute.route('/user/new').post(createUser)
userRoute.route('/user/organization/:id').get(getAllUsersByOrganizationId)
userRoute.route('/user/branch/:id').get(getAllUsersByBranchId)
userRoute.route('/user/update/:id').put(updateUserById)
userRoute.route('/user/delete/:id').delete(deleteUserById)
userRoute.route('/user/:id').get(getUserById)
userRoute.route('/user/employment/update/:id').put(updateUserEmployment)
userRoute.route('/user/active/organization/:id').get(getAllActiveUsersByOrganizationId)
userRoute.route('/user/non/active/organization/:id').get(getAllNonActiveUsersByOrganizationId)
userRoute.route('/user/lineManager/:id').get(getLineManagerByuserId)