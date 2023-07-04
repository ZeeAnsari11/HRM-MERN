import { DepartmentModel } from '../models/departmentSchema.js'
import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { createNew, deleteById, handleCatch, updateById } from '../utils/common.js'

//// Creating New Department ////
export const createDepartment = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error("Request Body is empty")
        if (req.body.unique_id) throw new Error("unique_id is not required in body")
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error("organization dont exist")
                BranchModel.findById(req.body.branch)
                    .then((branch) => {
                        if (!branch) throw new Error("branch dont exist")
                        if (req.body.organization == branch.organization) {
                            req.body.unique_id = req.body.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                            createNew(req, res, next, DepartmentModel)
                        }
                        else throw new Error("branch not found in organization")
                    })
                    .catch((err) => handleCatch(err, res, 404, next))
            })
            .catch((err) => handleCatch(err, res, 404, next))
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

//// Get All Departments By Branch Id ////
export const getAllDepartmentsByBranchId = (req, res, next) => {
    DepartmentModel.find({ branch: req.params.id })
        .then((departments) => {
            if (departments.length == 0) throw new Error("there is no department within this Branch")
            res.status(200).json({
                success: true,
                departments
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const getAllDepartmentsByOrganizationId = (req, res, next) => {
    DepartmentModel.find({ organization: req.params.id }).populate('branch')
        .then((departments) => {
            if (departments.length == 0) throw new Error("there is no department within this Organization")
            res.status(200).json({
                success: true,
                departments
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
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
                throw new Error(`No Department Found`)
            }
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// Update Department By Id or Assign the User(s) to the Department ////
export const updateDepartmentById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.branch) {
            throw new Error('Cannot Update the Organization or branch of the Department.')
        }
        if (!req.body.users) {
            if (req.body.name) {
                DepartmentModel.findById(req.params.id)
                    .then((department) => {
                        if (!department) throw new Error("Department Not Found")
                        req.body.unique_id = department.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                        updateById(req, res, next, DepartmentModel, "Department Details")
                    })
                    .catch((err) => { handleCatch(err, res, 404, next) })
            }
            else {
                updateById(req, res, next, DepartmentModel);
            }
        }
        if (req.body.users && Object.entries(req.body).length > 1) throw new Error('Invalid Body.')
    }
    catch (error) {
        handleCatch(err, res, 422, next)
    }
    if (req.body.users) {
        DepartmentModel.findById(req.params.id)
            .then((dep) => {
                if (!dep) throw new Error("Department not found")
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
                            }
                            if (req.body.users.length == count) {
                                req.body.users = DbUSer;
                                DepartmentModel.findByIdAndUpdate(req.params.id, req.body)
                                    .then((response) => {
                                        if (!response) {
                                            throw new Error(`${message} Not Found`);
                                        }
                                        res.status(200).json({
                                            success: true,
                                            Message: `Updated Successfully`,
                                            NotFoundUsers: `User(s) not found ${notExistUser}`
                                        })
                                    })
                                    .catch((err) => handleCatch(err, res, 500, next))
                            }

                        })
                        .catch((err) => handleCatch(err, res, 401, next))
                })
            })
            .catch((err) => handleCatch(err, res, 404, next))
    }
}

//// Delete Department By Id ////
export const deleteDepartmentById = (req, res, next) => {
    deleteById(req.params.id, res, next, DepartmentModel, "Department")
}

//// Get Branch By Department Id ////
export const getBranchByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw new Error("Department not found")
            BranchModel.find({ _id: department.branch })
                .then((branch) => {
                    if (branch) {
                        if (!branch) throw new Error("Branch not found")
                        res.status(200).json({
                            success: true,
                            branch
                        })
                    }
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// Get Organization By Department Id ////
export const getOrganizationByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw new Error(`No Department with this id ${req.params.id}`)
            OrganizationModel.find({ _id: department.organization })
                .then((organization) => {
                    if (!organization) throw new Error(`No Organization with this id ${req.params.id}`)
                    res.status(201).json({
                        success: true,
                        organization
                    })
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// Get all Users By Department Id ////
export const getUsersByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((response) => {
            if (!response) throw new Error("No Such Department")
            if (Object.keys(response.users).length === 0) throw new Error("No users are there for this department.")
            res.status(201).json({
                success: true,
                users: response.users
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })

}

//// Get User Department By Id ////
export const getUserDepartmentById = (req, res, next) => {
    DepartmentModel.find({ users: { $elemMatch: { $in: [req.params.id] } } })
        .then((department) => {
            if (department.length == 0) throw new Error("Department is not assigned to user")
            if (department) {
                res.status(200).json({
                    succes: true,
                    department
                })
            }
        })
        .catch(err => handleCatch(err, res, 404, next));
}

//// Delete User Department By Id ////
export const deleteUserDepartmentById = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw new Error("No Such User")
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
                                .catch((err) => {
                                    handleCatch(err, res, 500, next)
                                })
                        }
                    })
                })
                .catch((err) => {
                    handleCatch(err, res, 500, next)
                })
        })
        .catch((err) => {
            handleCatch(err, res, 404, next)
        })
}