import express from "express";
import {
    createUser, getAllUsersByOrganizationId, getAllUsersByBranchId, updateUserById,
    deleteUserById, getUsersByStatus, getUserById, updateUserEndOfEmployment, getAllActiveUsersByOrganizationId,
    getAllNonActiveUsersByOrganizationId
} from '../controllers/user.js'

export const userRoute = express.Router();

userRoute.route('/user/new').post(createUser)
userRoute.route('/user/organization/:id').get(getAllUsersByOrganizationId)
userRoute.route('/user/branch/:id').get(getAllUsersByBranchId)
userRoute.route('/user/update/:id').put(updateUserById)
userRoute.route('/user/delete/:id').delete(deleteUserById)
userRoute.route('/user/status').get(getUsersByStatus)
userRoute.route('/user/:id').get(getUserById)
userRoute.route('/user/eoe/:id').put(updateUserEndOfEmployment)
userRoute.route('/user/active/organization/:id').get(getAllActiveUsersByOrganizationId)
userRoute.route('/user/non/active/organization/:id').get(getAllNonActiveUsersByOrganizationId)