import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { createNew, deleteById, updateById } from '../utils/common.js'

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

export const updateUserById = (req, res, next) => {
    if (req.body.organization) {
        res.status(404).json({
            success: false,
            message: 'Cannot Update the Organization of the User'
        })
    }
    updateById(req, res, next, UserModel);
}
