import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
import { LeaveTypeModel } from "../models/leaveTypeSchema.js";
import { UserModel } from "../models/userSchema.js"
import { handleCatch, createNew, updateById, checkIsExistAndCreate } from '../utils/common.js'

const placeHolder = '0001-01-01T';

export const createNewLeaveRequest = (req, res, next) => {
    try {
        if (req.body.short == true && (!req.body.shortleaveDetails?.shortLeaveType || !req.body.shortleaveDetails?.startTime) || Object.keys(req.body.shortleaveDetails).length > 2) throw 'Invalid Body.'
        UserModel.findById(req.body.user)
            .then((user) => {
                if (!user) throw `No such user ${req.body.user}`
                LeaveTypeModel.findById(req.body.leaveType)
                    .then((leaveType) => {
                        if (!leaveType) throw `No such leave Type ${req.body.leaveType}`
                        if (leaveType.organization.toString() !== req.body.organization.toString()) throw `No this leave type in this organization ${req.body.organization}`
                        if (req.body.short == true) {
                            if (leaveType.shortLeave == false) throw 'Cannot request short leave for this leave type.'
                            leaveType.shortLeaveType.forEach((shrtLeaveType) => {
                                let id = req.body.organization + req.body.shortleaveDetails.shortLeaveType.replace(/\s/g, "").toLowerCase()
                                if (shrtLeaveType.unique_id == id) {
                                    let startTime = new Date(placeHolder + req.body.shortleaveDetails.startTime);
                                    req.body.shortleaveDetails.startTime = startTime;
                                    req.body.shortleaveDetails.endTime = startTime.getHours() + shrtLeaveType.balance
                                    console.log(req.body.shortleaveDetails.endTime);
                                    //createNew(req, res, next, LeaveRequestModel)
                                }
                            });
                        }
                        //else createNew(req, res, next, LeaveRequestModel)
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