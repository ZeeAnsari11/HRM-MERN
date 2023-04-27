import { BranchModel } from '../models/branchSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { UserModel } from '../models/userSchema.js'
import { DepartmentModel } from '../models/departmentSchema.js'
import { EmploymentModel } from '../models/employmentSchema.js'
import { TimeSlotsModel } from "../models/timeSlotsSchema.js";
import { handleCatch, updateById } from '../utils/common.js'
import { LeaveTypeModel } from '../models/leaveTypeSchema.js'

//// Create User ////
export const addingUser = (req, res, next) => {
    try {
        if (req.body.isActive == true || req.body.isActive == false || req.body.isActive) throw 'you cannot provide the isActive status of the employee';
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw "organization dont exist"
                BranchModel.findById(req.body.branch)
                    .then((branch) => {
                        if (!branch) throw "branch dont exist"
                        else if (req.body.organization !== branch.organization.toString()) throw "branch not found in organization"
                        else if (req.body.areaBounded?.isBounded == true && !req.body.areaBounded.addArea) throw 'Kindly Add the area'
                        else if (req.body.HOD?.isHOD == true && !req.body.HOD.department) throw 'Kindly provide the department name of HOD'
                        else if (req.body.HOD?.isHOD == true && req.body.HOD.department) {
                            DepartmentModel.findById(req.body.HOD.department)
                                .then((department) => {
                                    if (!department) throw 'No Such Department'
                                    if (department.organization.toString() !== req.body.organization.toString()) throw `Department does not match with org.`
                                    injection(req, res, next, organization);
                                })
                                .catch((error) => {
                                    handleCatch(`${error}`, res, 401, next)
                                })
                        }
                        else injection(req, res, next, organization);
                    })
                    .catch((error) => {
                        handleCatch(`${error}`, res, 401, next)
                    })
            })
            .catch((err) => { handleCatch(err, res, 401, next) })
    }
    catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const injection = (req, res, next, organization) => {
    if (req.body.firstUser == true) {
        userCreate(req, res, next, organization)
    }
    else {
        checkLineManager(req, res, next, organization)
    }
}

const checkLineManager = (req, res, next, organization) => {
    UserModel.findById(req.body.lineManager)
        .then((user) => {
            if (!user) throw `No Such Line Manager ${req.body.lineManager}`
            if (user.organization.toString() !== req.body.organization.toString()) throw `Line Manager does not match with org.`
            if (user.branch.toString() !== req.body.branch.toString()) { throw "Line Manager does not match with branch of newly creating user" }
            if (user.isLineManager !== true) throw `Provided Line Manager is not Line Manager.`
            checkingProbation(req, res, next, organization)
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const checkingProbation = (req, res, next, organization) => {
    try {
        if (req.body.probation) {
            if (req.body.probation.isOnProbation == true) {
                if (!req.body.probation.durationOfProbation) throw 'Kindly Add the duration of probation period'
                if (req.body.probation.durationOfProbation < 0 || req.body.probation.durationOfProbation > 12) throw 'duration must be in range of 0-12'
                req.body.probation.status = "pending";
                let joiningMonth = new Date(req.body.joiningDate).getMonth()
                let completionMonth = Number(joiningMonth) + Number(req.body.probation.durationOfProbation)
                let completionDate = new Date(req.body.joiningDate);
                completionDate.setMonth(completionMonth)
                req.body.probation.completionDate = completionDate
                userRoster(req, res, next)
                userCreate(req, res, next, organization)
            }
            else {
                if (req.body.probation.isOnProbation == false && req.body.probation.durationOfProbation) {
                    if (req.body.probation.durationOfProbation) throw 'kindly provide isOnProbation as true'
                }
                else {
                    userRoster(req, res, next)
                    userCreate(req, res, next, organization)
                }
            }
        }
        else {
            userRoster(req, res, next)
            userCreate(req, res, next, organization)
        }
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const userRoster = (req, res, next) => {
    if (!req.body.userRoster || !req.body.userRoster?.timeSlots || !req.body.userRoster?.restDays) throw 'Kindly Provide Data for Roster'
    req.body.userRoster.restDays.forEach(restDay => {
        if (restDay < 1 || restDay > 7) throw 'Invalid Rest Days.'
    });
    TimeSlotsModel.findById(req.body.userRoster.timeSlots)
        .then((timeSlot) => {
            if (!timeSlot) throw `No such timeSlot ${req.body.userRoster.timeSlots}`
            if (timeSlot.organization.toString() !== req.body.organization.toString()) throw 'No such timeSlot in Provided organization.'
            creatingRoster(req, res, next, null, timeSlot)
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const creatingRoster = (req, res, next, user = null, timeSlot = null) => {
    var startDate = new Date(user ? user.joiningDate : req.body.joiningDate);
    var endDate = new Date(startDate.getFullYear(), 11, 32);
    var slotTimeStart = timeSlot.startTime.getHours() + ":" + timeSlot.startTime.getMinutes()
    var slotTimeEnd = timeSlot.endTime.getHours() + ":" + timeSlot.endTime.getMinutes();
    user ? user.roster.employeeRosterDetails = []
        :
        req.body.roster = {
            employeeRosterDetails: []
        }
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if (!req.body.userRoster.restDays.includes(i.getDay())) {
            let x = {
                day: i.getDay(),
                date: i.toUTCString(),
                workingHours: slotTimeStart + " - " + slotTimeEnd,
                plannedHours: Math.abs(new Date(timeSlot.endTime) - new Date(timeSlot.startTime)) / (60 * 60 * 1000)
            }
            user ? user.roster.employeeRosterDetails.push(x) : req.body.roster.employeeRosterDetails.push(x)
        }
    }
    user ? userSave(res, next, user) : ''
}

const userCreate = (req, res, next, organization) => {
    try {
        EmploymentModel.findById(req.body.employmentType)
            .then((employmentType) => {
                if (!employmentType) throw 'No Such Employment Type'
                if (employmentType.organization.toString() !== req.body.organization.toString()) throw `Employment Type does not match with org.`
                req.body.userDefinedCode = (organization.userCode.currentCode + 1);
                let skills = req.body.skills || []
                skills.forEach((skill, index) => {
                    skills[index] = skill.toLowerCase();
                    skills[index][0].toUpperCase();
                });
                req.body.skills = [...new Set(skills)];
                addingUserLeaves(req, res, next, organization);
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const addingUserLeaves = (req, res, next, organizationRef) => {
    req.body.leaveTypeDetails = []
    LeaveTypeModel.find({ organization: req.body.organization })
        .then((leaveTypes) => {
            leaveTypes.forEach(leaveType => {
                let x = {
                    leaveType: leaveType._id,
                    count: leaveType.accumulativeCount
                }
                req.body.leaveTypeDetails.push(x)
            })
            UserModel.create(req.body)
                .then((response) => {
                    organizationRef.userCode.currentCode = organizationRef.userCode.currentCode + 1;
                    res.status(200).json({
                        success: true,
                        response
                    })
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
                .finally(() => {
                    organizationRef.save();
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
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
    UserModel.findById(req.params.id).populate('organization branch designation')
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
    try {
        if (req.body.organization) throw 'Cannot Update Org.'
        UserModel.findById(req.params.id)
            .then((user) => {
                if (!user) throw `No Such User ${req.params.id}`;
                if (req.body.userRoster && (req.body.userRoster?.timeSlots || req.body.userRoster?.restDays)) {
                    if (Object.keys(req.body).length > 3) throw 'Cannot update roster'
                    updateUserRoster(req, res, next, user)
                }
                else if (req.body.reason && req.body.id && req.body.action) {
                    if (Object.keys(req.body).length > 3) throw 'Cannot update reason'
                    updateUserEOERehireReason(req, res, next, user)
                }
                else if (req.body.duration !== undefined) {
                    if (Object.keys(req.body).length > 1) throw 'Cannot update probation details'
                    if (req.body.duration < 0 || req.body.duration > 12) throw 'duration must be in range of 0-12'
                    if (req.body.duration == 0) {
                        user.probation.durationOfProbation = 0;
                        user.probation.status = "complete"
                        user.probation.completionDate = new Date(user.joiningDate)
                    }
                    else {
                        user.probation.durationOfProbation = req.body.duration
                        let completionDate = new Date(user.joiningDate);
                        user.probation.completionDate = completionDate
                    }
                    userSave(res, next, user)
                }
                else if (req.body.skills?.length > 0) {
                    if (req.body.reason !== undefined > 0) throw 'Cannot update Skills'
                    let dbSkills = user.skills || []
                    let skills = req.body.skills
                    skills.forEach((skill) => {
                        let skl = skill.toLowerCase();
                        if (!dbSkills.includes(skl)) {
                            dbSkills.push(skl);
                        }
                    });
                    req.body.skills = dbSkills;
                    updateById(req, res, next, UserModel);
                }
                else {
                        updateById(req, res, next, UserModel)
                };
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const updateUserRoster = (req, res, next, user) => {
    try {
        if (!req.body.userRoster.timeSlots && req.body.userRoster.restDays) {
            user.userRoster.restDays = [];
            req.body.userRoster.restDays.forEach(restDay => {
                if (restDay < 1 || restDay > 7) throw 'Invalid Rest Days.'
                user.userRoster.restDays.push(restDay)
            });
            TimeSlotsModel.findById(user.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw `No such timeSlot ${user.userRoster.timeSlots}`
                    creatingRoster(req, res, next, user, timeSlot)
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        }
        else if (req.body.userRoster.timeSlots && req.body.userRoster.restDays) {
            user.userRoster.restDays = [];
            req.body.userRoster.restDays.forEach(restDay => {
                if (restDay < 1 || restDay > 7) throw 'Invalid Rest Days.'
                user.userRoster.restDays.push(restDay)
            });
            TimeSlotsModel.findById(req.body.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw `No such timeSlot ${req.body.userRoster.timeSlots}`
                    if (timeSlot.organization.toString() !== user.organization.toString()) throw 'No such timeSlot in Provided organization.'
                    user.userRoster.timeSlots = req.body.userRoster.timeSlots
                    creatingRoster(req, res, next, user, timeSlot)
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        }
        else if (req.body.date && req.body.userRoster.timeSlots) {
            TimeSlotsModel.findById(req.body.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw `No such timeSlot ${req.body.userRoster.timeSlots}`
                    user.roster.employeeRosterDetails.forEach(rosterDetail => {
                        if (rosterDetail.date.toString() == new Date(req.body.date).toString()) {
                            var slotTimeStart = timeSlot.startTime.getHours() + ":" + timeSlot.startTime.getMinutes()
                            var slotTimeEnd = timeSlot.endTime.getHours() + ":" + timeSlot.endTime.getMinutes();
                            let workingHours = slotTimeStart + " - " + slotTimeEnd
                            let plannedHours = Math.abs(new Date(timeSlot.endTime) - new Date(timeSlot.startTime)) / (60 * 60 * 1000)
                            rosterDetail.workingHours = workingHours
                            rosterDetail.plannedHours = plannedHours
                            userSave(res, next, user)
                        }
                    })
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        }
        else throw 'Invalid Body.'
    }
    catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const userSave = (res, next, user) => {
    user.save()
        .then((response) => {
            res.status(200).json({
                success: true,
                response: response
            })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const updateUserEOERehireReason = (req, res, next, user) => {
    try {
        if (req.body.action == "E0E") {
            user.EOE.details.forEach((eoe) => {
                if (eoe._id == req.body.id) {
                    eoe.data.reason = req.body.reason
                }
            });
        }
        else if (req.body.action == "rehire") {
            user.rehire.forEach((reh) => {
                if (reh._id == req.body.id) {
                    reh.reason = req.body.reason
                }
            });
        }
        else throw 'id did not exist'
        user.save()
            .then((response) => {
                res.status(200).json({
                    success: true,
                    response: response
                })
            })
            .catch((err) => {
                handleCatch(`${err}`, res, 401, next)
            })
    }
    catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}


//// get All Active / Non-Active Users of an Organization By Id ////
export const filterUserByOrganizationId = (req, res, next) => {
    try {
        if (!req.body.organization) throw "Organization not specified";
        if (Object.keys(req.body).length > 1) {
            UserModel.find(req.body).select('_id firstName lastName')
                .then((users) => {
                    if (users.length === 0) throw `No users are there in this organization with status: ${req.body.isActive}`
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        active_users: users
                    })
                })
                .catch((err) => handleCatch(err,res, 401, next))
        }
    } catch (error) { handleCatch(err,res, 401, next) }
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
        if (Object.keys(req.body).length == 0) throw "Request Body is empty"
        if (req.body.isActive == false) {
            if (!req.body.resignationDate) throw "Kindly Provide resignation date"
            else if (!req.body.noticePeriod && req.body.lastWorkingDate !== undefined) throw "You cannot provide the Last Working Date while the notice period is not been served"
            else if (req.body.noticePeriod !== undefined && !req.body.lastWorkingDate) throw "Kindly provide the Last Working Date"
            else if (!req.body.reason) throw "Kindly Provide the Reason"
            userActivationStatus(req, res, next, false, "User is already de-actiavted")
        }
        else if (req.body.isActive == true) {
            if (!req.body.date) throw "Kindly Provide the Rehire Date"
            else if (req.body.eoeType !== undefined) throw "EOE type must not be defined while rehiring"
            else if (!req.body.reason) throw "Kindly Provide the Reason"
            userActivationStatus(req, res, next, true, "User is already Activated")
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
const userActivationStatus = (req, res, next, toggler, msg) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw "user does not exist"
            if (user.isActive == toggler) throw msg
            user.isActive = toggler;
            let date = req.body.lastWorkingDate || req.body.resignationDate
            let lastEOE = user.EOE.details.length > 0 ? user.EOE.details.at(-1).data.lastWorkingDate : new Date('0001-01-01')
            let lastrehire = user.rehire.at(-1)?.date || new Date('0001-01-01');

            //// EOE Case ////
            if (toggler == false) {
                let details = {
                    eoeType: req.body.eoeType,
                    data: {
                        reason: req.body.reason,
                        resignationDate: req.body.resignationDate,
                        lastWorkingDate: req.body.lastWorkingDate || req.body.resignationDate,
                        noticePeriod: req.body.noticePeriod || false
                    }
                }
                userActivation(req, res, details, lastrehire, user.EOE.details, date, user, "User EOE must be greater than last rehire date")
            }

            //// Rehire Case ////
            else {
                let type = {
                    date: req.body.date,
                    reason: req.body.reason
                }
                userActivation(req, res, type, lastEOE, user.rehire, req.body.date, user, 'User EOE must be define first in order to rehire Or rehire date must be greater than EOE date')
            }
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: `${err}`
            })
        })
}

const userActivation = (req, res, details, date, arr, statusDate, user, msg) => {
    if (new Date(statusDate) >= date) {
        arr.push(details)
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
                user.save().then((response) => {
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
                user.save().then(() => {
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

export const getChildsByUserId = (req, res, next) => {
    try {
        if (!req.body.id) throw "Please provide the Id for which you want to retrieve childs"
        UserModel.find({ lineManager: req.body.id, isActive: true })
            .then((childs) => {
                if (childs.length == 0) {
                    throw "No childs found"
                }
                res.status(200).json({
                    success: true,
                    count: childs.length,
                    childs
                })
            })
            .catch(err => handleCatch(err, res, 401, next))
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const validateUserToken = (req, res, next) => {
    if (req.body.resetPasswordToken || req.body.resetPasswordExpire) {
        return handleCatch("Can't add/update reset password token", res, 401, next);
    }
    else return next();
}

export const updateUserProbation = (req, res, next) => {

}