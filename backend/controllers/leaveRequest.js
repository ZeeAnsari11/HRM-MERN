import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { LeaveTypeModel } from "../models/leaveTypeSchema.js";
import { UserModel } from "../models/userSchema.js"
import { ShortLeaveTypeModel } from "../models/shortLeaveTypeSchema.js";
import { creatingRequest } from "../utils/request.js";
import { handleCatch, updateById, deleteById, getById } from '../utils/common.js'

const placeHolder = '0001-01-01T';

export const addingLeaveRequest = (req, res, next) => {
    try {
        if (!req.body.leaveType) throw new Error('Kindly Provide Leave Type.')
        if (req.body.count) throw new Error('Please remove count.')
        if (!req.body.startDate) throw new Error('Kindly Provide Start Date.')
        if (!req.body.organization) throw new Error('Kindly Provide Organization.')
        let dates = []
        LeaveTypeModel.findById(req.body.leaveType)
            .then((leaveType) => {
                if (!leaveType) throw new Error`No such leave type ${req.body.leaveType}`
                if (leaveType.organization.toString() !== req.body.organization) throw new Error(`No this leave type in this organization ${req.body.organization}`)
                UserModel.findById(req.body.user)
                    .then((user) => {
                        if (!user) throw new Error(`No such user ${req.body.user}`)
                        user.leaveTypeDetails.forEach(userLeaveType => {
                            if (userLeaveType.leaveType.toString() == req.body.leaveType) {
                                leaveRequestType(req, res, next, leaveType, user, userLeaveType.count)
                            }
                        })
                    })
                    .catch((error) => {
                        handleCatch(error, res, 404, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

const leaveRequestType = (req, res, next, leaveType, user, availableLeaves) => {
    // console.log("==============L1===availableLeaves====", availableLeaves);
    if (req.body.short == true && leaveType.shortLeave == true) {
        shortLeaveRequest(req, res, next, user, availableLeaves)
    }
    else fullLeaveRequest(req, res, next, user, availableLeaves)
}

const shortLeaveRequest = (req, res, next, user, availableLeaves) => {
    try {
        if (!req.body.shortleaveDetails?.shortLeaveType || !req.body.shortleaveDetails?.startTime || req.body.shortleaveDetails?.endTime || req.body.endDate) throw new Error('Invalid Body.')
        ShortLeaveTypeModel.findById(req.body.shortleaveDetails.shortLeaveType)
            .then((shrtLeaveType) => {
                if (!shrtLeaveType) throw new Error({ message: `No such short leave type ${req.body.shortleaveDetails.shortLeaveType}`, statusCode: 404 });
                req.body.count = shrtLeaveType.balance;
                req.body.availableLeaves = availableLeaves - shrtLeaveType.balance;
                if (req.body.availableLeaves >= req.body.count) {
                    req.body.endDate = req.body.startDate;
                    userShortLeaveHours(req, shrtLeaveType, user, null);
                    req.body.status = 'pending';
                    creatingLeaveRequest(req, res, next, user);
                } else {
                    throw { message: 'Invalid Leave.', statusCode: 400 };
                }
            })
            .catch((error) => {
                handleCatch(error, res, error.statusCode || 401, next);
            });
    } catch (error) {
        handleCatch(error, res, 400, next)
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
    // console.log("==============L2===count====", count);

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
        // console.log("==============L2===availableLeaves====", availableLeaves);

        if (!req.body.endDate) throw new Error('Kindly Provide End Date.')
        req.body.count = calculateCount(req, user);
        // console.log("========count=========", req.body.count);
        req.body.availableLeaves = availableLeaves - req.body.count
        if (availableLeaves >= req.body.count) {
            req.body.status = 'pending'
            userLeaveCountReduction(req, user, req.body.count)
            creatingLeaveRequest(req, res, next, user)
        }
        else throw new Error('Invalid Leave Number of Days.')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

const calculateCount = (req, user = null) => {
    if (req.body.short == false) {
        let count;
        let leaveDaysIndexes = [];
        const startDate = new Date(req.body.startDate);
        const endDate = new Date(req.body.endDate);
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const index = new Date(date);
            const dayIndex = index.getDay();
            leaveDaysIndexes.push(dayIndex)
        }
        count = leaveDaysIndexes.filter(leaveDaysIndex => !(user.userRoster.restDays.includes(leaveDaysIndex)))
        // console.log("=======count array===", count);;
        return count.length;
    }
}

const creatingLeaveRequest = (req, res, next, user) => {
    LeaveRequestModel.create(req.body)
        .then((leaveRequest) => {
            creatingRequest(req, res, next, user, leaveRequest, '64351dbe9e45310b2991aaf3', '64351d4e9e45310b2991aaef', 'Leave')
        })
        .catch((error) => {
            handleCatch(error, res, 500, next)
        })
}

export const updateLeaveRequest = (req, res, next) => {
    try {
        if (req.body.organization || !req.body.leaveType || !req.body.user || req.body.availableLeaves || req.body.count || req.body.createdAt || !req.body.startDate) throw new Error('Invalid Body.')
        LeaveTypeModel.findById(req.body.leaveType)
            .then((leaveType) => {
                if (!leaveType) throw new Error(`No such leave type ${req.body.leaveType}`)
                LeaveRequestModel.find({ user: req.body.user, leaveType: leaveType._id })
                    .then((userLeaveRequests) => {
                        if (!userLeaveRequests) throw new Error(`No such Leave Request`)
                        UserModel.findById(req.body.user)
                            .then((user) => {
                                if (!user) throw new Error(`No such user ${req.body.user}`)
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
                                handleCatch(error, res, 401, next)
                            })
                    })
                    .catch((error) => {
                        handleCatch(error, res, 400, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next);
            });
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

const updateLeaveRequestFromFullToFull = (req, res, next, user, leaveRequest) => {
    try {
        if (!req.body.endDate) throw new Error('Kindly Provide End Date.')
        req.body.count = calculateCount(req, user);
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
                else throw new Error('Invalid Leave Number of Days.')
            }
        })
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

const updateLeaveRequestFromShortToShort = (req, res, next, user, leaveRequest) => {
    updateLeaveRequestFromFullToShort(req, res, next, user, leaveRequest)
}

const updateLeaveRequestFromShortToFull = (req, res, next, user, leaveRequest) => {
    ShortLeaveTypeModel.findById(leaveRequest.shortleaveDetails.shortLeaveType)
        .then((shrstLeaveType) => {
            req.body.shortleaveDetails = {}
            if (!req.body.endDate) throw new Error('Kindly Provide End Date.')
            req.body.count = calculateCount(req, user);
            let count = req.body.count - shrstLeaveType.balance
            userLeaveCountReduction(req, user, count)
            user.leaveTypeDetails.forEach(leaveType => {
                if (leaveType.leaveType.toString() == leaveRequest.leaveType) {
                    req.body.availableLeaves = leaveType.count
                    if (req.body.availableLeaves >= req.body.count) {
                        req.body.status = leaveRequest.status
                        updateById(req, res, next, LeaveRequestModel, 'LeaveRequest')
                    }
                    else throw new Error('Invalid Leave Number of Days.')
                }
            })
        })
        .catch((error) => {
            handleCatch(error, res, 400, next)
        })
}

const updateLeaveRequestFromFullToShort = (req, res, next, user, leaveRequest) => {
    try {
        if (!req.body.shortleaveDetails?.shortLeaveType || !req.body.shortleaveDetails?.startTime || req.body.shortleaveDetails?.endTime || req.body.endDate) throw new Error('Invalid Body.')
        ShortLeaveTypeModel.findById(req.body.shortleaveDetails.shortLeaveType)
            .then((shrtLeaveType) => {
                if (!shrtLeaveType) throw new Error(`No such short leave type ${req.body.shortleaveDetails.shortLeaveType}`)
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
                        else throw new Error('Invalid Leave Number of Days.')
                    }
                })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
}

export const getLeaveRequest = (req, res, next) => {
    getById(req.params.id, res, next, LeaveRequestModel, 'LeaveRequest')
}

export const deleteLeaveRequest = (req, res, next) => {
    deleteById(req.params.id, res, next, LeaveRequestModel, 'LeaveRequest')
}

export const rejectLeaveRequest = (req, res, next, show = true) => {
    try {
        LeaveRequestModel.findById(req.params.id)
            .then((userLeaveRequests) => {
                if (!userLeaveRequests) throw new Error('No such Leave.')
                if (userLeaveRequests.status !== 'rejected' && show) throw new Error("Leave is already rejected.")
                UserModel.findById(userLeaveRequests.user)
                    .then((user) => {
                        if(!user) throw new Error("User not found")
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
                                        if (show) {
                                            res.status(200).json({
                                                success: true,
                                                Message: 'Leave Rejected Successfully.'
                                            })
                                        }
                                        else return
                                    })
                            })
                            .catch((error) => {
                                handleCatch(error, res, 500, next)
                            })
                    })
                    .catch((error) => {
                        handleCatch(error, res, 404, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const userLeaveRequests = (req, res, next) => {
    LeaveRequestModel.find({ user: req.params.id })
        .then((leaves) => {
            if (leaves.length == 0) throw new Error('User did not request any leave')
            res.status(200).json({
                success: true,
                leaves
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}