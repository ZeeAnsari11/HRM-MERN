import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { DepartmentModel } from '../models/departmentSchema.js'
import { createNew, deleteById, getAll, updateById } from '../utils/common.js'

//// Create User ////
export const createUser = (req, res, next) => {
    try {
        if (req.body.isActive == true || req.body.isActive == false || req.body.isActive) throw 'you cannot provide the isActive status of the employee';
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw "organization dont exist"
                BranchModel.findById(req.body.branch)
                    .then((branch) => {
                        let skills = req.body.skills || []
                        skills.forEach((skill, index) => {
                            skills[index] = skill.toLowerCase();
                            skills[index][0].toUpperCase();
                        });
                        req.body.skills = [...new Set(skills)];
                        if (!branch) throw "branch dont exist"
                        else if (req.body.organization !== branch.organization.toString()) throw "branch not found in organization"
                        else if (req.body.areaBounded.isBounded == true && !req.body.areaBounded.addArea) throw 'Kindly Add the area'
                        else if (req.body.HOD.isHOD == true && !req.body.HOD.department) throw 'Kindly provide the department name of HOD'
                        else if (req.body.HOD.isHOD == true && req.body.HOD.department) {
                            DepartmentModel.findById(req.body.HOD.department)
                                .then((department) => {
                                    if (!department) throw 'No Such Department'
                                    if (department.organization.toString() !== req.body.organization.toString()) throw `Department does not match with org.`
                                    injection(req, res, next);
                                })
                                .catch((err) => {
                                    res.status(404).json({
                                        success: false,
                                        message: `${err}`
                                    })
                                })
                        }
                        else injection(req, res, next);
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

const injection = (req, res, next) => {
    UserModel.findById(req.body.lineManager)
        .then((user) => {
            if (!user) throw 'No Such User'
            if (user.organization.toString() !== req.body.organization.toString()) throw `Line Manager does not match with org.`
            if (user.isLineManager !== true) throw `Provided Line Manager is not Line Manager.`
            createNew(req, res, next, UserModel)
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

//// get line manager of user by id ////
export const getLineManagerByuserId = (req, res, next) => {
    UserModel.findById(req.params.id).populate('lineManager')
        .then((user) => {
            if (!user) throw `No Such User Exist ${req.params.id}`
            res.status(200).json({
                success: true,
                lineManager: user.lineManager
            })
        })
        .catch((error) => {
            res.status(404).json({
                success: false,
                message: `${error}`
            })
        })
}

//// get department's head by id ////
export const getHODByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw `No Such Department Exist ${req.params.id}`
            UserModel.find({ "HOD.department": department._id })
                .then((hod) => {
                    if (hod.length <= 0) throw 'No Department Found'
                    res.status(200).json({
                        success: true,
                        hod: hod
                    })
                })
                .catch((error) => {
                    res.status(404).json({
                        success: false,
                        message: `${error}`
                    })
                })
        })
}

export const getAttendanceExemptUsers = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.attendanceExempt !== undefined) {
            UserModel.find({ organization: req.params.id, attendanceExempt: req.body.attendanceExempt })
                .then((users) => {
                    if (users.length === 0) throw `No users are there in this organization with status: ${req.body.attendanceExempt}`
                    res.status(200).json({
                        success: true,
                        count: users.length,
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
        else throw 'invalid body'
    } catch (error) {
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
            OrganizationModel.findById(user.organization)
                .then((organization) => {
                    if (!organization) throw "organization dont exist"
                    user.userDefinedCode = organization.userCode.prefix + user.userDefinedCode
                    res.status(200).json({
                        success: true,
                        user: user
                    })
                })
                .catch((error) => {
                    throw error
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
                    users.forEach((user) => {
                        user.userDefinedCode = organization.userCode.prefix + user.userDefinedCode
                    })
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
    if (req.body.skills.length > 0) {
        let skills = req.body.skills || [];
        skills.forEach((skill, index) => {
            skills[index] = skill.toLowerCase();
            skills[index][0].toUpperCase();
        });
        req.body.skills = [...new Set(skills)];
    }
    updateById(req, res, next, UserModel);
}

//// get All Active / Non-Active Users of an Organization By Id ////
export const getActiveNonActiveUsersByOrganizationId = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.isActive !== undefined) {
            UserModel.find({ organization: req.params.id, isActive: req.body.isActive })
                .then((users) => {
                    if (users.length === 0) throw `No users are there in this organization with status: ${req.body.isActive}`
                    res.status(200).json({
                        success: true,
                        count: users.length,
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
        else throw 'invalid body'
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const getEmployeeTypeByOrganizationId = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.employeeType !== undefined) {
            UserModel.find({ organization: req.params.id, employeeType: req.body.employeeType })
                .then((users) => {
                    if (users.length === 0) throw `No users are there in this organization with type: ${req.body.employeeType}`
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        users: users
                    })
                })
                .catch((err) => {
                    res.status(404).json({
                        success: false,
                        message: `${err}`
                    })
                })
        }
        else throw 'invalid body'
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

export const getRoleTypeByOrganizationId = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.roleType !== undefined) {
            UserModel.find({ organization: req.params.id, roleType: req.body.roleType })
                .then((users) => {
                    if (users.length === 0) throw `No users are there in this organization with type: ${req.body.roleType}`
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        users: users
                    })
                })
                .catch((err) => {
                    res.status(404).json({
                        success: false,
                        message: `${err}`
                    })
                })
        }
        else throw 'invalid body'
    } catch (error) {
        res.status(404).json({
            success: false,
            message: `${error}`
        })
    }
}

//// update End of Employment of user By Id ////
export const updateUserEmployment = (req, res, next) => {
    try {
        if (!req.body.date) throw `Kindly Provide date`
        else if (!req.body.reason) throw `Kindly Provide reason`
        else if (req.body.isActive == false) {
            userActiovationStatus(req, res, next, false, "User is already de-actiavted")
        }
        else if (req.body.isActive == true) {
            userActiovationStatus(req, res, next, true, "User is already Activated")
        }
        else throw "state is not defined."
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
            let lastEOE = user.EOE.at(-1)?.date || new Date('0001-01-01')
            let lastrehire = user.rehire.at(-1)?.date || new Date('0001-01-01');
            let type = {
                reason: req.body.reason,
                date: req.body.date
            }
            //// EOE Case ////
            if (toggler == false) {
                userActiovation(req, res, type, lastrehire, user.EOE, user, "User EOE must be greater than last rehire date")
            }
            //// Rehire Case ////
            else {
                userActiovation(req, res, type, lastEOE, user.rehire, user, 'User EOE must be define first in order to rehire Or rehire date must be greater than EOE date')
            }
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

const userActiovation = (req, res, type, date, arr, user, msg) => {
    if (new Date(req.body.date) > date) {
        arr.push(type)
        user.save()
            .then((response) => {
                res.status(200).json({
                    success: true,
                    response: response
                })
            })
            .catch((err) => {
                res.status(404).json({
                    success: false,
                    message: `${err}`
                })
            })
    }
    else throw msg
}

export const addSkillsToUser = (req, res, next) => {

}