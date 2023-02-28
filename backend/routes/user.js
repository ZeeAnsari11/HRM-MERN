import express from "express";
import {
    createUser, getAllUsersByOrganizationId, getAllUsersByBranchId, updateUserById,
    deleteUserById, getUsersByStatus, getUserById
} from '../controllers/user.js'

export const userRoute = express.Router();

userRoute.route('/user/new').post(createUser)
userRoute.route('/user/organization/:id').get(getAllUsersByOrganizationId)
userRoute.route('/user/branch/:id').get(getAllUsersByBranchId)
userRoute.route('/user/update/:id').put(updateUserById)
userRoute.route('/user/delete/:id').delete(deleteUserById)
userRoute.route('/user/status').get(getUsersByStatus)
userRoute.route('/user/:id').get(getUserById)