import { WFHModel } from "../models/wfhSchema.js";
import { UserModel } from '../models/userSchema.js'
import { creatingRequest } from "../utils/request.js";
import mongoose from "mongoose"
import { RequestFlowModel } from "../models/requestFlowSchema.js";
import { handleCatch, updateById, getById, deleteById, getAll } from '../utils/common.js'

export const creatingWFH = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw new Error(`No User Found`)
            if (req.body.status) throw new Error('Invalid Body.')
            if (user.organization.toString() !== req.body.organization) throw new Error('No such user in organization')
            if (new Date(req.body.startDate) > new Date(req.body.endDate)) throw new Error('Invalid Date.')
            mongoose.startSession().then((session) => {
                session.startTransaction();
                WFHModel.create([req.body], { session: session })
                    .then((newWFH) => {
                        let WFH = newWFH[0];
                        return RequestFlowModel.find({ name: "WFH Flow" }).populate({
                            path: "requestType",
                            match: {
                                organization: user.organization,
                            },
                        })
                            .then((flows) => {
                                let flow = flows.filter(flow => flow.requestType != null)
                                if (flow.length == 0) {
                                    throw new Error("There is no flow defined for this type of request by organization.");
                                } else {
                                    return Promise.resolve(flow[0]);
                                }
                            })
                            .then((flow) => {
                                session.commitTransaction()
                                creatingRequest(req, res, next, user, WFH, flow._id, flow.requestType._id, "WFH");
                            })
                            .catch((err) => {
                                session.endSession();
                                handleCatch(err, res, 400, next);
                            });
                    })
                    .catch((err) => handleCatch(err, res, 400, next));
            })
        })
        .catch((error) => {
            handleCatch(error, res, 400, next)
        })
}

export const updateWFH = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status) throw new Error('Invalid Body.')
        WFHModel.findById(req.params.id)
            .then((wfh) => {
                if (!wfh) throw new Error('No such wfh')
                if (wfh.status !== "pending") {
                    const invalidAction = new Error(`cannot update this WFH`);
                    invalidAction.statusCode = 409;
                    throw invalidAction
                }
                if (req.body.startDate || req.body.endDate) {
                    if (req.body.startDate && req.body.endDate && (new Date(req.body.startDate) > new Date(req.body.endDate))) throw new Error('Invalid Date.')
                    if (!req.body.startDate && req.body.endDate && new Date(wfh.startDate) > new Date(req.body.endDate)) throw new Error('Invalid Date.')
                    if (req.body.startDate && !req.body.endDate && new Date(req.body.startDate) > new Date(wfh.endDate)) throw new Error('Invalid Date.')
                    updateById(req, res, next, WFHModel, 'WFH')
                }
                else updateById(req, res, next, WFHModel, 'WFH')
            })
            .catch((error) => {
                handleCatch(error, res, error.statusCode || 404, next);
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getWFH = (req, res, next) => {
    getById(req.params.id, res, next, WFHModel, 'WFH')
}

export const deleteWFH = (req, res, next) => {
    WFHModel.findById(req.params.id)
        .then((wfh) => {
            if (!wfh) throw new Error('No such WFH')
            if (wfh.status !== "pending") throw new Error(`cannot delete this WFH`)
            deleteById(req.params.id, res, next, WFHModel, 'WFH')
        })
        .catch((error) => {
            handleCatch(error, res, 403, next)
        })
}

export const rejectLeaveRequest = (req, res, next) => {
    try {
        WFHModel.findById(req.params.id)
            .then((wfh) => {
                if (wfh.status !== 'rejected') {
                    wfh.status = 'rejected'
                    wfh.save()
                        .then(() => {
                            res.status(200).json({
                                success: true,
                                Message: 'WFH Rejected Successfully.'
                            })
                        })
                        .catch((error) => {
                            handleCatch(error, res, 401, next)
                        })
                }
                else throw new Error('Already rejected.')
            })
            .catch((error) => {
                handleCatch(error, res, 409, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getAllWFHByUserId = (req, res, next)=>{
    getAll(res, next, WFHModel, {user : req.params.id}, "WFH's")
}