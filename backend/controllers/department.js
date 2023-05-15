import { DepartmentModel } from '../models/departmentSchema.js'
import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { createNew, handleCatch, updateById } from '../utils/common.js'

//// Creating New Department ////
export const createDepartment = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.unique_id) throw "unique_id is not required in body"
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw "organization dont exist"
                BranchModel.findById(req.body.branch)
                    .then((branch) => {
                        if (!branch) throw "branch dont exist"
                        if (req.body.organization == branch.organization) {
                            req.body.unique_id = req.body.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                            createNew(req, res, next, DepartmentModel)
                        }
                        else throw "branch not found in organization"
                    })
                    .catch((err) => handleCatch(err, res, 401, next))
            })
            .catch((err) => handleCatch(err, res, 401, next))
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

//// Get All Departments By Branch Id ////
export const getAllDepartmentsByBranchId = (req, res, next) => {
    DepartmentModel.find({ branch: req.params.id })
        .then((department) => {
            res.status(200).json({
                success: true,
                department
            })
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}

export const getAllDepartmentsByOrganizationId = (req, res, next) => {
    DepartmentModel.find({ organization: req.params.id })
        .then((departments) => {
            if (departments) {
                res.status(200).json({
                    success: true,
                    departments
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Organization with this id ${req.params.id}`
                })
            }
        })
}

//// Get Department By Id ////
export const getDepartmentById = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                res.status(200).json({
                    success: true,
                    department
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })

}

//// Update Department By Id or Assign the User(s) to the Department ////
export const updateDepartmentById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.branch) {
            throw 'Cannot Update the Organization or branch of the Department.'
        }
        if (!req.body.users) {
            if (req.body.name) {
                DepartmentModel.findById(req.params.id)
                    .then((department) => {
                        if (!department) throw "Department Not Found"
                        req.body.unique_id = department.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                        updateById(req, res, next, DepartmentModel, "Department Details")
                    })
                    .catch((err) => { handleCatch(err, res, 401, next) })
            }
            else {
                updateById(req, res, next, DepartmentModel);
            }
        }
        if (req.body.users && Object.entries(req.body).length > 1) throw 'Invalid Body.'
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
    if (req.body.users) {
        DepartmentModel.findById(req.params.id)
            .then((dep) => {
                if (!dep) throw "Department not found"
                let DbUSer = dep.users || [];
                let notExistUser = []
                let count = 0
                req.body.users.forEach((userId) => {
                    UserModel.find({ _id: userId, branch: dep.branch })
                        .then((user) => {
                            count++;
                            if (user.length == 0) notExistUser.push(userId);
                            else {
                                if (!DbUSer.includes(user._id)) {
                                    DbUSer.push(user._id);
                                }
                                if (req.body.users.length == count) {
                                    req.body.users = DbUSer;
                                    DepartmentModel.findByIdAndUpdate(req.params.id, req.body)
                                        .then((response) => {
                                            if (!response) {
                                                throw (`${message} Not Found`);
                                            }
                                            res.status(200).json({
                                                success: true,
                                                Message: `Updated Successfully`,
                                                NotFoundUsers: `User(s) not found ${notExistUser}`
                                            })
                                        })
                                        .catch((err) => handleCatch(err, res, 401, next))
                                }
                            }
                        })
                        .catch((err) => handleCatch(err, res, 401, next))
                })
            })
            .catch((err) => handleCatch(err, res, 401, next))
    }
}

//// Delete Department By Id ////
export const deleteDepartmentById = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (department) {
                department.remove()
                res.status(200).json({
                    success: true,
                    message: 'Department Deleted Successfully'
                })
            }
            else {
                res.status(404).json({
                    success: false,
                    message: `No Department with this id ${req.params.id}`
                })
            }
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}

//// Get Branch By Department Id ////
export const getBranchByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw "Department not found"
            BranchModel.find({ _id: department.branch })
                .then((branch) => {
                    if (branch) {
                        if (!branch) throw "Branch not found"
                        res.status(200).json({
                            success: true,
                            branch
                        })
                    }
                })
        })
        .catch((error) => {
            next({ error: error, statusCode: 404 })
        })
}

//// Get Organization By Department Id ////
export const getOrganizationByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw `No Department with this id ${req.params.id}`
            OrganizationModel.find({ _id: department.organization })
                .then((organization) => {
                    if (!organization) throw `No Organization with this id ${req.params.id}`
                    res.status(201).json({
                        success: true,
                        organization
                    })
                })
                .catch((error) => {
                    next({ error: error, statusCode: 404 })
                })
                .catch((error) => {
                    next({ error: error, statusCode: 404 })
                })
        })
}

//// Get all Users By Department Id ////
export const getUsersByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((response) => {
            if (!response) throw "No Such Department"
            if (Object.keys(response.users).length === 0) throw "No users are there for this department."
            res.status(201).json({
                success: true,
                users: response.users
            })
        })
        .catch((error) => {
            res.status(404).json({
                success: false,
                message: `${error}`
            })
        })

}

//// Get User Department By Id ////
export const getUserDepartmentById = (req, res, next) => {
    DepartmentModel.find({ users: { $elemMatch: { $in: [req.params.id] } } })
        .then((department) => {
            if (department.length == 0) throw "Department is not assigned to user"
            if (department) {
                res.status(200).json({
                    succes: true,
                    department
                })
            }
        })
        .catch(err => handleCatch(err, res, 401, next));
}

//// Delete User Department By Id ////
export const deleteUserDepartmentById = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw "No Such User"
            DepartmentModel.find()
                .then((departments) => {
                    departments.forEach((department) => {
                        if (department.users.includes(req.params.id)) {
                            let usersAfterDeletion = department.users.filter((userId) => {
                                return userId.toString() !== req.params.id
                            })
                            department.users = usersAfterDeletion
                            department.save()
                                .then(() => {
                                    res.status(200).json({
                                        success: true,
                                        message: `User with id: ${req.params.id} is deleted from the department`
                                    })
                                })
                                .catch((error) => {
                                    res.status(404).json({
                                        success: false,
                                        message: `${error}`
                                    })
                                })
                        }
                    })
                })
                .catch((error) => {
                    res.status(404).json({
                        success: false,
                        message: `${error}`
                    })
                })
        })
        .catch((error) => {
            res.status(404).json({
                success: false,
                message: `${error}`
            })
        })
}