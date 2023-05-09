import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { LeaveTypeModel } from "../models/leaveTypeSchema.js";
import { UserModel } from "../models/userSchema.js"
import { ShortLeaveTypeModel } from "../models/shortLeaveTypeSchema.js";
import { creatingRequest } from "../utils/request.js";
import { handleCatch, updateById, deleteById, getById } from '../utils/common.js'

const placeHolder = '0001-01-01T';

export const addingLeaveRequest = (req, res, next) => {
    try {
        if (!req.body.leaveType) throw 'Kindly Provide Leave Type.'
        if (req.body.count) throw 'Please remove count.'
        if (!req.body.startDate) throw 'Kindly Provide Start Date.'
        if (!req.body.organization) throw 'Kindly Provide Organization.'
        let leaveDaysIndex = []
        LeaveTypeModel.findById(req.body.leaveType)
            .then((leaveType) => {
                if (!leaveType) throw `No such leave type ${req.body.leaveType}`
                if (leaveType.organization.toString() !== req.body.organization) throw `No this leave type in this organization ${req.body.organization}`
                UserModel.findById(req.body.user)
                    .then((user) => {
                        if (!user) throw `No such user ${req.body.user}`
                        const startDate = new Date(req.body.startDate);
                        const endDate = new Date(req.body.endDate);
                        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
                            const index = new Date(date);
                            const dayIndex = index.getDay();
                            leaveDaysIndex.push(dayIndex)
                        }
                        console.log("leaveDaysIndex", leaveDaysIndex);
                        console.log("!user.userRoster.restDays.includes(leaveDaysIndex)", !user.userRoster.restDays.includes(leaveDaysIndex));
                        // if (!user.Roster.restDays.includes(leaveDaysIndex)) {
                        //     user.leaveTypeDetails.forEach(userLeaveType => {
                        //         if (userLeaveType.leaveType.toString() == req.body.leaveType) {
                        //             leaveRequestType(req, res, next, leaveType, user, userLeaveType.count)
                        //         }
                        //     })
                        // }
                        // else throw 'Invalid leave Days.'
                    })
                    .catch((error) => {
                        handleCatch(`${error}`, res, 401, next)
                    })
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const leaveRequestType = (req, res, next, leaveType, user, availableLeaves) => {
    if (req.body.short == true && leaveType.shortLeave == true) {
        shortLeaveRequest(req, res, next, user, availableLeaves)
    }
    else fullLeaveRequest(req, res, next, user, availableLeaves)
}

const shortLeaveRequest = (req, res, next, user, availableLeaves) => {
    try {
        if (!req.body.shortleaveDetails?.shortLeaveType || !req.body.shortleaveDetails?.startTime || req.body.shortleaveDetails?.endTime || req.body.endDate) throw 'Invalid Body.'
        ShortLeaveTypeModel.findById(req.body.shortleaveDetails.shortLeaveType)
            .then((shrtLeaveType) => {
                if (!shrtLeaveType) throw `No such short leave type ${req.body.shortleaveDetails.shortLeaveType}`
                req.body.count = shrtLeaveType.balance
                req.body.availableLeaves = availableLeaves - shrtLeaveType.balance
                if (req.body.availableLeaves >= req.body.count) {
                    req.body.endDate = req.body.startDate
                    userShortLeaveHours(req, shrtLeaveType, user, null)
                    req.body.status = 'pending'
                    createNew(req, res, next, LeaveRequestModel)
                }
                else throw 'Invalid Leave.'
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const userShortLeaveHours = (req, shrtLeaveType, user, update = null) => {
    let leaveTotalHours = 0
    user.roster.employeeRosterDetails.forEach(userRoster => {
        if (userRoster.date.toString() == new Date(req.body.startDate).toString()) {
            leaveTotalHours = userRoster.plannedHours * shrtLeaveType.balance
        }
    });
    let endTime = new Date(placeHolder + req.body.shortleaveDetails.startTime).getHours() + leaveTotalHours
    req.body.shortleaveDetails.startTime = new Date(placeHolder + req.body.shortleaveDetails.startTime)
    req.body.shortleaveDetails.endTime = new Date(placeHolder + formatTime(endTime) + ":00")
    update ? '' : userLeaveCountReduction(req, user, shrtLeaveType.balance)
}

const userLeaveCountReduction = (req, user, count) => {
    user.leaveTypeDetails.forEach(leaveType => {
        if (leaveType.leaveType.toString() == req.body.leaveType) {
            leaveType.count = leaveType.count - count
        }
    })
    user.save();
}

const formatTime = (time) => {
    const hours = Math.floor(time);
    const minutes = Math.round((time - hours) * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

const fullLeaveRequest = (req, res, next, user, availableLeaves) => {
    try {
        if (!req.body.endDate) throw 'Kindly Provide End Date.'
        req.body.count = calculateCount(req);
        req.body.availableLeaves = availableLeaves - req.body.count
        if (availableLeaves >= req.body.count) {
            req.body.status = 'pending'
            userLeaveCountReduction(req, user, req.body.count)
            creatingLeaveRequest(req, res, next, user)
        }
        else throw 'Invalid Leave Number of Days.'
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const calculateCount = (req) => {
    if (req.body.short == false) {
        let count = 0
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            count++
        }
        return count;
    }
}

const creatingLeaveRequest = (req, res, next, user) => {
    LeaveRequestModel.create(req.body)
        .then((leaveRequest) => {
            creatingRequest(req, res, next, user, leaveRequest, '64351dbe9e45310b2991aaf3', '64351d4e9e45310b2991aaef', 'Leave')
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

export const updateLeaveRequest = (req, res, next) => {
    try {
        if (req.body.organization || !req.body.leaveType || !req.body.user || req.body.availableLeaves || req.body.count || req.body.createdAt || !req.body.startDate) throw 'Invalid Body.'
        LeaveTypeModel.findById(req.body.leaveType)
            .then((leaveType) => {
                if (!leaveType) throw `No such leave type ${req.body.leaveType}`
                LeaveRequestModel.find({ user: req.body.user, leaveType: leaveType._id })
                    .then((userLeaveRequests) => {
                        if (!userLeaveRequests) throw `No such Leave Request`
                        UserModel.findById(req.body.user)
                            .then((user) => {
                                if (!user) throw `No such user ${req.body.user}`
                                userLeaveRequests.forEach(userLeaveRequest => {
                                    if (userLeaveRequest._id.toString() == req.params.id.toString()) {
                                        if (req.body.short == undefined) {
                                            req.body.short = userLeaveRequest.short
                                        }
                                        if (userLeaveRequest.short !== req.body.short) {
                                            req.body.organization = userLeaveRequest.organization
                                            if (userLeaveRequest.short == true && req.body.short == false) {
                                                updateLeaveRequestFromShortToFull(req, res, next, user, userLeaveRequest)
                                            }
                                            else if (userLeaveRequest.short == false && req.body.short == true) {
                                                updateLeaveRequestFromFullToShort(req, res, next, user, userLeaveRequest)
                                            }
                                        }
                                        else if (userLeaveRequest.short == true && req.body.short == true) {
                                            if (userLeaveRequest.leaveType !== req.body.leaveType || new Date(userLeaveRequest.startDate) !== new Date(req.body.startDate) || userLeaveRequest.shortleaveDetails.shortLeaveType.toString() !== req.body.userLeaveRequest.shortleaveDetails.shortLeaveType || userLeaveRequest.shortleaveDetails.startTime !== req.body.shortleaveDetails.startTime) {
                                                req.body.organization = userLeaveRequest.organization
                                                updateLeaveRequestFromShortToShort(req, res, next, user, userLeaveRequest)
                                            } else {
                                                updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                                            }
                                        }
                                        else if (userLeaveRequest.short == false && req.body.short == false) {
                                            if (userLeaveRequest.leaveType !== req.body.leaveType || new Date(userLeaveRequest.startDate) !== new Date(req.body.startDate) || new Date(userLeaveRequest.endDate) !== new Date(req.body.endDate)) {
                                                req.body.organization = userLeaveRequest.organization
                                                updateLeaveRequestFromFullToFull(req, res, next, user, userLeaveRequest)
                                            } else {
                                                updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                                            }
                                        }
                                        else {
                                            updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                                        }
                                    }
                                })
                            })
                            .catch((error) => {
                                handleCatch(`${error}`, res, 401, next)
                            })
                    })
                    .catch((error) => {
                        handleCatch(`${error}`, res, 401, next)
                    })
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

const updateLeaveRequestFromFullToFull = (req, res, next, user, leaveRequest) => {
    if (!req.body.endDate) throw 'Kindly Provide End Date.'
    req.body.count = calculateCount(req);
    if (leaveRequest.count > req.body.count) {
        let count = leaveRequest.count - req.body.count
        userLeaveCountReduction(req, user, -count)
    }
    else if (leaveRequest.count < req.body.count) {
        let count = req.body.count - leaveRequest.count
        userLeaveCountReduction(req, user, count)
    }
    user.leaveTypeDetails.forEach(leaveType => {
        if (leaveType.leaveType.toString() == leaveRequest.leaveType) {
            req.body.availableLeaves = leaveType.count
            if (req.body.availableLeaves >= req.body.count) {
                req.body.status = leaveRequest.status
                updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
            }
            else throw 'Invalid Leave Number of Days.'
        }
    })
}

const updateLeaveRequestFromShortToShort = (req, res, next, user, leaveRequest) => {
    updateLeaveRequestFromFullToShort(req, res, next, user, leaveRequest)
}

const updateLeaveRequestFromShortToFull = (req, res, next, user, leaveRequest) => {
    ShortLeaveTypeModel.findById(leaveRequest.shortleaveDetails.shortLeaveType)
        .then((shrstLeaveType) => {
            req.body.shortleaveDetails = {}
            if (!req.body.endDate) throw 'Kindly Provide End Date.'
            req.body.count = calculateCount(req);
            let count = req.body.count - shrstLeaveType.balance
            userLeaveCountReduction(req, user, count)
            user.leaveTypeDetails.forEach(leaveType => {
                if (leaveType.leaveType.toString() == leaveRequest.leaveType) {
                    req.body.availableLeaves = leaveType.count
                    if (req.body.availableLeaves >= req.body.count) {
                        req.body.status = leaveRequest.status
                        updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                    }
                    else throw 'Invalid Leave Number of Days.'
                }
            })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

const updateLeaveRequestFromFullToShort = (req, res, next, user, leaveRequest) => {
    if (!req.body.shortleaveDetails?.shortLeaveType || !req.body.shortleaveDetails?.startTime || req.body.shortleaveDetails?.endTime || req.body.endDate) throw 'Invalid Body.'
    ShortLeaveTypeModel.findById(req.body.shortleaveDetails.shortLeaveType)
        .then((shrtLeaveType) => {
            if (!shrtLeaveType) throw `No such short leave type ${req.body.shortleaveDetails.shortLeaveType}`
            req.body.count = shrtLeaveType.balance
            req.body.endDate = req.body.startDate
            let count = leaveRequest.count - shrtLeaveType.balance
            userShortLeaveHours(req, shrtLeaveType, user, true)
            userLeaveCountReduction(req, user, -count)
            user.leaveTypeDetails.forEach(leaveType => {
                if (leaveType.leaveType.toString() == leaveRequest.leaveType) {
                    req.body.availableLeaves = leaveType.count
                    if (req.body.availableLeaves >= req.body.count) {
                        req.body.status = leaveRequest.status
                        updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                    }
                    else throw 'Invalid Leave Number of Days.'
                }
            })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

export const getLeaveRequest = (req, res, next) => {
    getById(req.params.id, res, next, LeaveRequestModel, 'LeaveRequest')
}

export const deleteLeaveRequest = (req, res, next) => {
    deleteById(req.params.id, res, next, LeaveRequestModel, 'LeaveRequest')
}

export const rejectLeaveRequest = (req, res, next) => {
    try {
        LeaveRequestModel.findById(req.params.id)
            .then((userLeaveRequests) => {
                if (!userLeaveRequests) throw 'No such Leave.'
                if (userLeaveRequests.status !== 'rejected') {
                    UserModel.findById(userLeaveRequests.user)
                        .then((user) => {
                            user.leaveTypeDetails.forEach(leaveType => {
                                if (leaveType.leaveType.toString() == userLeaveRequests.leaveType.toString()) {
                                    leaveType.count = leaveType.count + userLeaveRequests.count
                                }
                            })
                            user.save()
                                .then(() => {
                                    userLeaveRequests.status = 'rejected'
                                    userLeaveRequests.save()
                                        .then(() => {
                                            res.status(200).json({
                                                success: true,
                                                Message: 'Leave Rejected Successfully.'
                                            })
                                        })
                                })

                        })
                        .catch((error) => {
                            handleCatch(`${error}`, res, 401, next)
                        })
                } else throw 'Leave is already rejected.'
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const userLeaveRequests = (req, res, next) => {
    LeaveRequestModel.find({ user: req.params.id })
        .then((leaves) => {
            if (leaves.length == 0) throw 'User did not request any leave'
            res.status(200).json({
                success: true,
                leaves
            })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}