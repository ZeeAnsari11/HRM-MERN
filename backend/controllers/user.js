import { createNew, handleCatch, updateById } from '../utils/common.js'

import { BranchModel } from '../models/branchSchema.js'
import { DepartmentModel } from '../models/departmentSchema.js'
import { EOETypeModel } from '../models/eoeTypeSchema.js'
import { EmploymentModel } from '../models/employmentSchema.js'
import { LeaveTypeModel } from '../models/leaveTypeSchema.js'
import { OrganizationModel } from '../models/organizationSchema.js'
import { TimeSlotsModel } from "../models/timeSlotsSchema.js";
import { UserModel } from '../models/userSchema.js'
import fs from 'fs';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads/', // Set your desired upload directory
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


const placeHolder = '0001-01-01T';
//// Create User ////
export const addingUser = (req, res, next) => {
    if (req.body.firstUser == true) {
        addingUserLeaves(req, res, next, req.body.organization, false);
        // createNew(req, res, next, UserModel, false)
    }
    else {
        try {
            if (req.body.isActive == true || req.body.isActive == false || req.body.isActive) throw new Error('you cannot provide the isActive status of the employee');
            OrganizationModel.findById(req.body.organization)
                .then((organization) => {
                    if (!organization) throw new Error("organization dont exist")
                    upload.single('profile')(req, res, (err) => {
                        if (err) {
                            return handleCatch(err, res, 400, next);
                        }
                    })
                    BranchModel.findById(req.body.branch)
                        .then((branch) => {
                            if (!branch) throw new Error("branch dont exist")
                            else if (req.body.organization !== branch.organization.toString()) throw new Error("branch not found in organization")
                            else if (req.body.areaBounded?.isBounded == true && !req.body.areaBounded.addArea) throw new Error('Kindly Add the area')
                            else if (req.body.HOD?.isHOD == true && !req.body.HOD.department) throw new Error('Kindly provide the department name of HOD')
                            else if (req.body.HOD?.isHOD == true && req.body.HOD.department) {
                                DepartmentModel.findById(req.body.HOD.department)
                                    .then((department) => {
                                        if (!department) throw new Error('No Such Department')
                                        if (department.organization.toString() !== req.body.organization.toString()) throw new Error(`Department does not match with org.`)
                                        injection(req, res, next, organization);
                                    })
                                    .catch((error) => {
                                        handleCatch(error, res, 404, next)
                                    })
                            }
                            else injection(req, res, next, organization);
                        })
                        .catch((error) => {
                            handleCatch(error, res, 404, next)
                        })
                })
                .catch((err) => { handleCatch(err, res, 404, next) })
        }
        catch (error) {
            handleCatch(error, res, 400, next)
        }
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
            if (!user) throw new Error(`No Such Line Manager ${req.body.lineManager}`)
            if (user.organization.toString() !== req.body.organization.toString()) throw new Error(`Line Manager does not match with org.`)
            if (user.branch.toString() !== req.body.branch.toString()) { throw new Error("Line Manager does not match with branch of newly creating user") }
            if (user.isLineManager !== true) throw new Error(`Provided Line Manager is not Line Manager.`)
            checkingProbation(req, res, next, organization)
        })
        .catch((error) => {
            handleCatch(error, res, 400, next)
        })
}

const checkingProbation = (req, res, next, organization) => {
    try {
        if (req.body.probation) {
            if (req.body.probation.isOnProbation == true) {
                if (!req.body.probation.durationOfProbation) throw new Error('Kindly Add the duration of probation period')
                if (req.body.probation.durationOfProbation < 0 || req.body.probation.durationOfProbation > 12) throw new Error('duration must be in range of 0-12')
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
                if (req.body.probation.isOnProbation == false && req.body.probation.durationOfProbation) throw new Error('Invalid Body.')
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
        handleCatch(error, res, 400, next)
    }
}

const userRoster = (req, res, next) => {
    try {
        if (!req.body.userRoster || !req.body.userRoster?.timeSlots || !req.body.userRoster?.restDays) throw new Error('Kindly Provide Data for Roster')
        req.body.userRoster.restDays.forEach(restDay => {
            if (restDay < 0 || restDay > 6) throw new Error('Invalid Rest Days.')
        });
        TimeSlotsModel.findById(req.body.userRoster.timeSlots)
            .then((timeSlot) => {
                if (!timeSlot) throw new Error`No such timeSlot ${req.body.userRoster.timeSlots}`
                if (timeSlot.organization.toString() !== req.body.organization.toString()) throw new Error('No such timeSlot in Provided organization.')
                creatingRoster(req, res, next, null, timeSlot)
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

const creatingRoster = (req, res, next, user = null, timeSlot = null) => {
    let startDate = user ? new Date(user.joiningDate) : new Date(req.body.joiningDate);
    startDate.setUTCHours(0, 0, 0, 0); // Set time to midnight in UTC
    startDate.setDate(startDate.getDate() + 1);
    let endDate = new Date(startDate.getFullYear(), 11, 32);
    let slotTimeStart = timeSlot.startTime;
    let slotTimeEnd = timeSlot.endTime;
    user ? (user.roster.employeeRosterDetails = []) : (req.body.roster = { employeeRosterDetails: [] });

    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
        if (!req.body.userRoster.restDays.includes(i.getDay())) {
            let x = {
                day: i.getUTCDay(),
                date: i.toISOString(),
                workingHours: slotTimeStart + " - " + slotTimeEnd,
                plannedHours: Math.abs(new Date(placeHolder + timeSlot.endTime) - new Date(placeHolder + timeSlot.startTime)) / (60 * 60 * 1000),
            };
            user ? user.roster.employeeRosterDetails.push(x) : req.body.roster.employeeRosterDetails.push(x);
        }
    }
    user ? userSave(res, next, user) : '';
};

const userCreate = (req, res, next, organization) => {
    try {
        EmploymentModel.findById(req.body.employmentType)
            .then((employmentType) => {
                if (!employmentType) throw new Error('No Such Employment Type')
                if (employmentType.organization.toString() !== req.body.organization.toString()) throw new Error(`Employment Type does not match with org.`)
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
                handleCatch(error, res, 400, next)
            })
    } catch (error) {
        handleCatch(error, res, 500, next)
    }
}

const addingUserLeaves = (req, res, next, organizationRef, show = true) => {
    req.body.leaveTypeDetails = []
    LeaveTypeModel.find({ organization: req.body.organization })
        .then((leaveTypes) => {

            if (leaveTypes.length == 0) throw new Error("No leave types found")
            leaveTypes.forEach(leaveType => {
                let x = {
                    leaveType: leaveType._id,
                    count: leaveType.accumulativeCount
                }
                req.body.leaveTypeDetails.push(x)
            })
            UserModel.create(req.body)
                .then((response) => {
                    if (show) {
                        organizationRef.userCode.currentCode = organizationRef.userCode.currentCode + 1;
                        res.status(200).json({
                            success: true,
                            response
                        })
                    }
                })
                .catch((error) => {
                    handleCatch(error, res, 500, next)
                })
                .finally(() => {
                    if (show) {
                        organizationRef.save()
                            .catch((error) => {
                                handleCatch(error, res, 500, next)
                            })
                    }
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// get line manager of user by id ////
export const getLineManagerByuserId = (req, res, next) => {
    UserModel.findById(req.params.id).populate('lineManager')
        .then((user) => {
            if (!user) throw new Error(`No Such User Exist ${req.params.id}`)
            res.status(200).json({
                success: true,
                lineManager: user.lineManager
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// get department's head by id ////
export const getHODByDepartmentId = (req, res, next) => {
    DepartmentModel.findById(req.params.id)
        .then((department) => {
            if (!department) throw new Error(`No Such Department Exist ${req.params.id}`)
            UserModel.find({ "HOD.department": department._id })
                .then((hod) => {
                    if (hod.length <= 0) throw new Error('No Department Found')
                    res.status(200).json({
                        success: true,
                        hod: hod
                    })
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch(err => handleCatch(err, res, 404, next))
}

export const getAttendanceExemptUsers = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error("Request Body is empty")
        if (req.body.attendanceExempt !== undefined) {
            UserModel.find({ organization: req.params.id, attendanceExempt: req.body.attendanceExempt })
                .then((users) => {
                    if (users.length === 0) throw new Error(`No users are there in this organization with status: ${req.body.attendanceExempt}`)
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        active_users: users
                    })
                })
                .catch((err) => {
                    handleCatch(err, res, 404, next)
                })
        }
        else throw new Error('invalid body')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// Get User By Id ////
export const getUserById = (req, res, next) => {
    UserModel.findById(req.params.id).populate('organization branch designation')
        .then((user) => {
            if (!user) throw new Error(`No Such User Exist ${req.params.id}`)
            OrganizationModel.findById(user.organization)
                .then((organization) => {
                    if (!organization) throw new Error("organization dont exist")
                    user.userDefinedCode = organization.userCode.prefix + user.userDefinedCode
                    res.status(200).json({
                        success: true,
                        user: user
                    })
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next);
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// Get All Users By Organization Id ////
export const getAllUsersByOrganizationId = (req, res, next) => {
    OrganizationModel.findById(req.params.id)
        .then((organization) => {
            if (!organization) throw new Error("organization dont exist")
            UserModel.find({ organization: req.params.id })
                .select('-roster')
                .populate('designation')
                .then((users) => {
                    if (users.length === 0) throw new Error("No users are there for this org.")
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
                    handleCatch(err, res, 404, next)
                })
        })
        .catch((err) => {
            handleCatch(err, res, 404, next)
        })
}

//// Get All Users By Branch Id ////
export const getAllUsersByBranchId = (req, res, next) => {
    BranchModel.findById(req.params.id)
        .then((branch) => {
            if (!branch) throw new Error("branch dont exist")
            UserModel.find({ branch: req.params.id })
                .then((users) => {
                    if (users.length === 0) throw new Error("No users are there for this branch.")
                    res.status(200).json({
                        success: true,
                        total_users: users.length,
                        users
                    })
                })
                .catch((err) => {
                    handleCatch(err, res, 404, next)
                })
        })
        .catch((err) => {
            handleCatch(err, res, 404, next)
        })
}

//// Delete User By Id ////
export const deleteUserById = (req, res, next) => {
    // deleteById(req.params.id, res, next, UserModel);
    let request = {
        body: {
            isActive : false
        },
        params : {id : req.params.id}
    }
    updateById(request, res, next, UserModel, "User")
}

//// Update User By Id ////
export const updateUserById = (req, res, next) => {
    try {
        if (req.body.organization) throw new Error('Cannot Update Org.')
        UserModel.findById(req.params.id)
            .then((user) => {
                if (!user) throw new Error`No Such User ${req.params.id}`;
                if (req.body.userRoster && (req.body.userRoster?.timeSlots || req.body.userRoster?.restDays)) {
                    if (Object.keys(req.body).length > 3) throw new Error('Cannot update roster')
                    updateUserRoster(req, res, next, user)
                }
                else if (req.body.reason && req.body.id && req.body.action) {
                    if (Object.keys(req.body).length > 3) throw new Error('Cannot update reason')
                    updateUserEOERehireReason(req, res, next, user)
                }
                else if (req.body.duration !== undefined) {
                    if (Object.keys(req.body).length > 1) throw new Error('Cannot update probation details')
                    if (req.body.duration < 0 || req.body.duration > 12) throw new Error('duration must be in range of 0-12')
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
                    req.body.skills = req.body.skills;
                    updateById(req, res, next, UserModel);
                }
                else {
                    updateById(req, res, next, UserModel)
                };
            })
            .catch((error) => {
                handleCatch(error, res, 400, next)
            })
    } catch (error) {
        handleCatch(error, res, 403, next)
    }
}

const updateUserRoster = (req, res, next, user) => {
    try {
        // console.log("==============eq.body.userRoster.restDays==============",req.body.userRoster.restDays);
        if (!req.body.userRoster.timeSlots && req.body.userRoster.restDays) {
            user.userRoster.restDays = [];
            req.body.userRoster.restDays.forEach(restDay => {
                if (restDay < 0 || restDay > 6) throw new Error('Invalid Rest Days.')
                user.userRoster.restDays.push(restDay)
            });
            TimeSlotsModel.findById(user.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw new Error(`No such timeSlot ${user.userRoster.timeSlots}`)
                    creatingRoster(req, res, next, user, timeSlot)
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        }
        else if (req.body.userRoster.timeSlots && req.body.userRoster.restDays) {
            user.userRoster.restDays = [];
            req.body.userRoster.restDays.forEach(restDay => {
                if (restDay < 0 || restDay > 6) throw new Error('Invalid Rest Days.')
                user.userRoster.restDays.push(restDay)
            });
            TimeSlotsModel.findById(req.body.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw new Error(`No such timeSlot ${req.body.userRoster.timeSlots}`)
                    if (timeSlot.organization.toString() !== user.organization.toString()) throw new Error('No such timeSlot in Provided organization.')
                    user.userRoster.timeSlots = req.body.userRoster.timeSlots
                    creatingRoster(req, res, next, user, timeSlot)
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        }
        else if (req.body.date && req.body.userRoster.timeSlots) {
            TimeSlotsModel.findById(req.body.userRoster.timeSlots)
                .then((timeSlot) => {
                    if (!timeSlot) throw new Error(`No such timeSlot ${req.body.userRoster.timeSlots}`)
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
                    handleCatch(error, res, 401, next)
                })
        }
        else throw new Error('Invalid Body.')
    }
    catch (error) {
        handleCatch(error, res, 400, next)
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
            handleCatch(error, res, 500, next)
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
        else throw new Error('id did not exist')
        user.save()
            .then((response) => {
                res.status(200).json({
                    success: true,
                    response: response
                })
            })
            .catch((err) => {
                handleCatch(err, res, 500, next)
            })
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
}

//// get All Active / Non-Active Users of an Organization By Id or all other field filters ////
export const filterUserByOrganizationId = (req, res, next) => {
    try {
        if (!req.body.organization) throw new Error("Organization not specified");
        if (Object.keys(req.body).length > 1) {
            UserModel.find(req.body).select('_id firstName lastName email')
                .then((users) => {
                    if (users.length === 0) throw new Error(`No users are there in this organization with status: ${req.body.isActive}`)
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        active_users: users
                    })
                })
                .catch((err) => handleCatch(err, res, 404, next))
        }
    } catch (error) { handleCatch(err, res, 400, next) }
}

export const getEmployeeTypeByOrganizationId = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error("Request Body is empty")
        if (req.body.employeeType !== undefined) {
            UserModel.find({ organization: req.params.id, employeeType: req.body.employeeType })
                .then((users) => {
                    if (users.length === 0) throw new Error(`No users are there in this organization with type: ${req.body.employeeType}`)
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        users: users
                    })
                })
                .catch((err) => {
                    handleCatch(err, res, 404, next)
                })
        }
        else throw new Error('invalid body')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getRoleTypeByOrganizationId = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error("Request Body is empty")
        if (req.body.roleType !== undefined) {
            UserModel.find({ organization: req.params.id, roleType: req.body.roleType })
                .then((users) => {
                    if (users.length === 0) throw new Error(`No users are there in this organization with type: ${req.body.roleType}`)
                    res.status(200).json({
                        success: true,
                        count: users.length,
                        users: users
                    })
                })
                .catch((err) => {
                    handleCatch(err, res, 404, next)
                })
        }
        else throw new Error('invalid body')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// update End of Employment of user By Id ////
export const updateUserEmployment = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error("Request Body is empty")
        if (req.body.isActive == false) {
            if (!req.body.resignationDate) throw new Error("Kindly Provide resignation date")
            else if (!req.body.noticePeriod && req.body.lastWorkingDate !== undefined) throw new Error("You cannot provide the Last Working Date while the notice period is not been served")
            else if (req.body.noticePeriod !== undefined && !req.body.lastWorkingDate) throw new Error("Kindly provide the Last Working Date")
            else if (!req.body.reason) throw new Error("Kindly Provide the Reason")
            userActivationStatus(req, res, next, false, "User is already de-actiavted")
        }
        else if (req.body.isActive == true) {
            if (!req.body.date) throw new Error("Kindly Provide the Rehire Date")
            else if (req.body.eoeType !== undefined) throw new Error("EOE type must not be defined while rehiring")
            else if (!req.body.reason) throw new Error("Kindly Provide the Reason")
            userActivationStatus(req, res, next, true, "User is already Activated")
        }
        else throw new Error("state is not defined.")
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// local method for de-activating user's account ////
const userActivationStatus = (req, res, next, toggler, msg) => {
    EOETypeModel.findById(req.body.eoeType)
        .then((eoeType) => {
            if (!eoeType) throw new Error("User and EOE type not belong to same organization")
            UserModel.findById(req.params.id)
                .then((user) => {
                    if (!user) throw new Error("user does not exist")
                    if (user.isActive == toggler) throw new Error(msg)
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
                    handleCatch(err, res, 404, next)
                })
        })
        .catch(err => handleCatch(err, res, 400, next));
}

const userActivation = (req, res, details, date, arr, statusDate, user, msg) => {
    try {
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
                    handleCatch(err, res, 400, next)
                })
        }
        else throw new Error(msg)
    }
    catch (err) { handleCatch(err, res, 400, next) };
}

export const addSkillsToUser = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw new Error('user dies not exist');
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
                        handleCatch(err, res, 500, next)
                    });
            }
        })
        .catch((err) => {
            handleCatch(err, res, 400, next)
        })

}

export const deleteSkillFromUser = (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            if (!user) throw new Error('user does not exist');
            if (req.body.skill) {
                if (!user.skills.includes(req.body.skill.toLowerCase())) throw new Error("Skill not found");
                let skills = user.skills.filter((skill) => skill !== req.body.skill.toLowerCase());
                user.skills = skills;
                user.save().then(() => {
                    res.status(200).json({
                        success: true,
                        message: "Skill deleted successfully",
                    })
                })
                    .catch((err) => {
                        handleCatch(err, res, 500, next)
                    });
            }
        })
        .catch((err) => {
            handleCatch(err, res, 400, next)
        })
}

export const getChildsByUserId = (req, res, next) => {

    try {
        console.log("fdfghj", req.params.id);
        if (!req.params.id) throw new Error("Please provide the Id for which you want to retrieve childs")
        UserModel.find({ lineManager: req.params.id, isActive: true })
            .then((childs) => {
                if (childs.length == 0) {
                    throw new Error("No childs found")
                }
                res.status(200).json({
                    success: true,
                    count: childs.length,
                    childs
                })
            })
            .catch(err => handleCatch(err, res, 404, next))
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const validateUserToken = (req, res, next) => {
    if (req.body.resetPasswordToken || req.body.resetPasswordExpire) {
        return handleCatch("Can't add/update reset password token", res, 401, next);
    }
    else return next();
}

export const updateUserProbation = (req, res, next) => {

}

export const addNewLeavesToUsers = (req, res, next) => {
    let count = 0
    LeaveTypeModel.findById(req.body.leaveType)
        .then((leave) => {
            if (!leave) throw new Error('No Such Leave Type.');
            let x = {
                leaveType: leave._id,
                count: leave.accumulativeCount
            };
            if (req.body.users) {
                addingLeaves(req, res, leave, x)
            }
            else {
                UserModel.find({ organization: req.params.id, firstUser: false })
                    .then((dbUsers) => {
                        dbUsers.forEach(dbUser => {
                            count = count + 1;
                            common(res, leave, x, dbUser, count, dbUsers.length)
                        })
                    })
            }
        })
        .catch(err => handleCatch(err, res, 404, next));
};

const addingLeaves = (req, res, leave, obj) => {
    let notFoundUser = [];
    let count = 0
    // console.log("req.body.users", req.body.users.length);
    req.body.users.forEach(bodyUserId => {
        UserModel.find({ _id: bodyUserId, organization: req.params.id, firstUser: false })
            .then((dbUser) => {
                if (dbUser.length == 0) {
                    count = count + 1;
                    notFoundUser.push(bodyUserId)
                }
                else {
                    dbUser.forEach(user => {
                        count = count + 1;
                        common(res, leave, obj, user, count, req.body.users.length, notFoundUser)
                    })
                }
            })
            .catch(err => handleCatch(err, res, 400, next))
    })
}

const common = (res, leave, obj, user, count, length, notFoundUser = null) => {
    let leaveTypeExists = user.leaveTypeDetails.some((detail) => {
        return detail.leaveType.toString() === leave._id.toString();
    });
    if (!leaveTypeExists) {
        user.leaveTypeDetails.push(obj);
        user.save();
    }
    console.log("count", count);
    if (length == count) {
        res.status(200).json({
            success: true,
            notFoundUser
        });
    }
}
export const getUserLeaveQuota = (req, res, next) => {
    try {
        UserModel.findOne({ _id: req.params.id }).select('firstName lastName leaveTypeDetails')
            .populate({
                path: 'leaveTypeDetails.leaveType',
                select: 'name accumulativeCount'
            })
            .then((result) => {
                if (!result) throw new Error("No Leave Quota not found")
                res.status(200).json({
                    success: true,
                    result
                })
            })
            .catch(err => handleCatch(err, res, 404, next))
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

// export const getUserLeaveQuota = (req, res, next) => {
//     try {
//         UserModel.findOne({ _id: req.params.id })
//             .select('firstName lastName leaveTypeDetails leaveRequests')
//             .populate({
//                 path: 'leaveTypeDetails.leaveType',
//                 select: 'name accumulativeCount'
//             })
//             .then((user) => {
//                 if (!user) throw new Error("No Leave Quota not found");

//                 const leaveQuota = user.leaveTypeDetails.map((leaveDetail) => {
//                     const { name, accumulativeCount } = leaveDetail.leaveType;

//                     // Calculate availed and remaining leaves for this leave type
//                     const leaveRequestsForType = user.leaveRequests.filter((request) => {
//                         return request.leaveType === name; // Assuming leave type is stored as 'name' in leave requests
//                     });

//                     const availed = leaveRequestsForType.reduce((total, request) => {
//                         // Calculate the number of days in the leave request
//                         const startDate = new Date(request.startDate);
//                         const endDate = new Date(request.endDate);
//                         const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                        
//                         return total + days;
//                     }, 0);

//                     const remaining = accumulativeCount - availed;

//                     return {
//                         leaveType: name,
//                         accumulativeCount,
//                         availed,
//                         remaining,
//                     };
//                 });

//                 res.status(200).json({
//                     success: true,
//                     leaveQuota,
//                 });
//             })
//             .catch((err) => handleCatch(err, res, 404, next));
//     } catch (err) {
//         handleCatch(err, res, 400, next);
//     }
// };



// Controller function for handling image upload
export const updateProfilePicture = (req, res, next) => {
    try {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'uploads'); // Save the uploaded files to the "uploads" folder
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const fileExtension = file.originalname.split('.').pop();
                cb(null, file.fieldname + '-' + uniqueSuffix + '.' + fileExtension);
            },
        });
        const upload = multer({ storage });
        upload.single('image')(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                return res.status(400).json({ error: 'Error uploading image.' });
            } else if (err) {
                return res.status(400).json({ error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ error: 'No image file received.' });
            }

            const userId = req.params.id;
            const imagePath = req.file.path;
            user.profile = imagePath;
            User.findById(userId, (err, user) => {
                if (err) {
                    return res.status(500).json({ error: 'Error finding the user.' });
                }

                if (!user) {
                    return res.status(404).json({ error: 'User not found.' });
                }

                // Update the user profile field with the imagePath
                user.profile = imagePath
                user.save((err, updatedUser) => {
                    if (err) {
                        return res.status(500).json({ error: 'Error updating user profile.' });
                    }

                    res.json(updatedUser); // Respond with the updated user object
                });
            });
        });
    } catch (err) {
        // Handle any other unexpected errors
        handleCatch(err, res, 400, next);
    }
};

export const selectUserBG_Shifter = (req, res, next) => {

    UserModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then((updatedDocument) => {
            if (!updatedDocument) {
                throw new Error(`User Not Found`);
            }
            res.status(200).json({
                success: true,
                Message: `BackGround Shifter Selected`
            });
        })
        .catch((error) => {
            handleCatch(error, res, 500, next);
        });
}