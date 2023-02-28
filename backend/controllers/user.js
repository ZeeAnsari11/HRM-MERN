import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { createNew, deleteById, getAll, updateById } from '../utils/common.js'

//// Create User ////
export const createUser = (req, res, next) => {
    OrganizationModel.findById(req.body.organization)
        .then((organization) => {
            if (!organization) throw "organization dont exist"
            BranchModel.findById(req.body.branch)
                .then((branch) => {
                    if (!branch) throw "branch dont exist"
                    if (req.body.organization !== branch.organization.toString()) throw "branch not found in organization"
                    createNew(req, res, next, UserModel)
                })
                .catch((err) => {
                    res.status(404).json({
                        success: false,
                        message: `${err}`
                    })
                })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

//// Get User By Id ////
export const getUserById = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw `No Such User Exist ${req.params.id}`
            res.status(200).json({
                success: true,
                user: user
            })
        })
        .catch((error) => {
            res.status(404).json({
                success: false,
                message: `${error}`
            })
        })
}

//// Get All Users By Organization Id ////
export const getAllUsersByOrganizationId = (req, res, next) => {
    OrganizationModel.findById(req.params.id)
        .then((organization) => {
            if (!organization) throw "organization dont exist"
            UserModel.find({ organization: req.params.id })
                .then((users) => {
                    if (users.length === 0) throw "No users are there for this org."
                    res.status(200).json({
                        success: true,
                        total_users: users.length,
                        users: users
                    })
                })
                .catch((err) => {
                    res.status(404).json({
                        success: false,
                        message: `${err}`
                    })
                })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

//// Get All Users By Branch Id ////
export const getAllUsersByBranchId = (req, res, next) => {
    BranchModel.findById(req.params.id)
        .then((branch) => {
            if (!branch) throw "branch dont exist"
            UserModel.find({ branch: req.params.id })
                .then((users) => {
                    if (users.length === 0) throw "No users are there for this branch."
                    res.status(200).json({
                        success: true,
                        total_users: users.length,
                        users
                    })
                })
                .catch((err) => {
                    res.status(404).json({
                        success: false,
                        message: `${err}`
                    })
                })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

export const deleteUserById = (req, res, next) => {
    // deleteById(req.params.id, res, next, UserModel);
}

//// Update User By Id ////
export const updateUserById = (req, res, next) => {
    if (req.body.organization) {
        res.status(404).json({
            success: false,
            message: 'Cannot Update the Organization of the User'
        })
    }
    updateById(req, res, next, UserModel);
}

//// Get user By Status ////
export const getUsersByStatus = (req, res, next) => {
    let user = getAll(res, next, UserModel, { status: req.body.status }, "user(s)")
}

//// Change User Status By Id ////
export const chnageUserStatus = (userId, status) => {
    UserModel.findById(userId)
        .then((user) => {
            if (!user) throw `No Such User ${userId}`
            user.status = status
            user.save()
                .then((response) => {
                    return response
                })
                .catch((error) => {
                    return error
                })
        })
        .catch((error) => {
            return error
        })
}

