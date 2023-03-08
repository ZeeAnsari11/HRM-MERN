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
                        let skills = req.body.skills || []
                        if (!branch) throw "branch dont exist"
                        if (req.body.organization !== branch.organization.toString()) throw "branch not found in organization"
                        skills.forEach((skill, index) => {
                            skills[index] = skill.toLowerCase();
                            skills[index][0].toUpperCase();
                        });
                        req.body.skills = [...new Set(skills)];
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
        UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw `No Such User ${req.body.id}`;
            let dbSkills = user.skills || []
            let skills = req.body.skills || [];
            skills.forEach((skill) => {
                let skl = skill.toLowerCase();
                if (!dbSkills.includes(skl)) {
                    dbSkills.push(skl);
                }
            });
            req.body.skills = dbSkills;
            updateById(req, res, next, UserModel);
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
    }
    else updateById(req, res, next, UserModel);
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
export const updateUserEmployment = (req, res, next) => {
    try {
        if (!req.body.date) throw `Kindly Provide date`
        else
            if (!req.body.reason) throw `Kindly Provide reason`
            else
                if (req.body.isActive == false) {
                    userActiovationStatus(req, res, next, false, "User is already de-actiavted")
                }
                else
                    if (req.body.isActive == true) {
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
    UserModel.findById(req.params.id)
    .then((user) => {
        if (!user) throw 'user dies not exist';
        if (req.body.skills.length > 0) {
            let skills = req.body.skills || [];
            skills.forEach((skill, index) => {
                skills[index] = skill.toLowerCase();
                skills[index][0].toUpperCase();
            });
            user.skills.push(...skills);
            user.skills = [...new Set(user.skills)];
            user.save().then((response)=>{
                res.status(200).json({
                    success: true,
                    message: "Skills added successfully",
                    data: response
                })
            })
            .catch((err) => {
                throw err;
            });
        }
    })
    .catch((err) => {
        res.status(401).json({
            success: false,
            message: err
        })
    })
    
}

export const deleteSkillFromUser = (req, res, next) => {
    UserModel.findById(req.params.id)
    .then((user) => {
        if (!user) throw 'user does not exist';
        if (req.body.skill) {
            if (!user.skills.includes(req.body.skill.toLowerCase())) throw "Skill not found";
            let skills = user.skills.filter((skill) => skill !== req.body.skill.toLowerCase());
            user.skills = skills;
            user.save().then(()=>{
                res.status(200).json({
                    success: true,
                    message: "Skill deleted successfully",
                })
            })
            .catch((err) => {
                throw err;
            });
        }
    })
    .catch((err) => {
        res.status(401).json({
            success: false,
            message: err
        })
    })
    
}