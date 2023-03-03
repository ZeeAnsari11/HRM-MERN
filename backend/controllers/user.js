import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { createNew, deleteById, getAll, updateById } from '../utils/common.js'

//// Create User ////
export const createUser = (req, res, next) => {
    try {
        if (req.body.isActive == true || req.body.isActive == false || req.body.isActive) throw 'you cannot provide the isActive status of the employee'
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
    catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
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

//// Delete User By Id ////
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

//// get All Active Users of an Organization By Id ////
export const getAllActiveUsersByOrganizationId = (req, res, next) => {
    UserModel.find({ organization: req.params.id, isActive: true })
        .then((users) => {
            if (users.length === 0) throw "No users are there for this org."
            res.status(200).json({
                success: true,
                total_active_users: users.length,
                active_users: users
            })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

//// get All Non Active Users of an Organization By Id ////
export const getAllNonActiveUsersByOrganizationId = (req, res, next) => {
    UserModel.find({ organization: req.params.id, isActive: false })
        .then((users) => {
            if (users.length === 0) throw "No Non Active users are there for this org."
            res.status(200).json({
                success: true,
                total_in_active_users: users.length,
                in_active_users: users
            })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

//// update End of Employment of user By Id ////
export const updateUserEndOfEmployment = (req, res, next) => {
    try {
        if (req.body.date) throw `Remove date request object`
        if (req.body.isActive == false) {
            userActiovationStatus(req, res, next, false, "User is already de-actiavted")
        }
        if (req.body.isActive == true) {
            userActiovationStatus(req, res, next, true, "User is already Activated")
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

//// local method for de-activating user's account ////
const userActiovationStatus = (req, res, next, toggler, msg) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw 'user dies not exist'
            if (user.isActive == toggler) throw msg
            user.isActive = toggler;
            let reason = {
                reason: req.body.reason
            }
            if (toggler == false) {
                user.EOE.push(reason)
            }
            else if (toggler == true) {
                user.rehire.push(reason)
            }
            user.save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        response: response
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
