import { WFHModel } from "../models/wfhSchema.js";
import { UserModel } from '../models/userSchema.js'
import { creatingRequest } from "../utils/request.js";
import { handleCatch, updateById, getById, deleteById } from '../utils/common.js'

export const creatingWFH = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw `No User Found`
            if (req.body.status) throw 'Invalid Body.'
            if (user.organization.toString() !== req.body.organization) throw 'No such user in organization'
            if (new Date(req.body.startDate) > new Date(req.body.endDate)) throw 'Invalid Date.'
            WFHModel.create(req.body)
                .then((wfh) => {
                    creatingRequest(req, res, next, user, wfh, '643d274ecb47b0a176489073', '643d271bcb47b0a17648906f', 'WFH')
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
        })
}

export const updateWFH = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status) throw 'Invalid Body.'
        WFHModel.findById(req.params.id)
            .then((wfh) => {
                if (!wfh) throw 'No such wfh'
                if (wfh.status !== "pending") throw `cannot update this WFH`
                if (req.body.startDate || req.body.endDate) {
                    if (!wfh) throw 'No such WFH'
                    if (req.body.startDate && req.body.endDate && (new Date(req.body.startDate) > new Date(req.body.endDate))) throw 'Invalid Date.'
                    if (!req.body.startDate && req.body.endDate && new Date(wfh.startDate) > new Date(req.body.endDate)) throw 'Invalid Date.'
                    if (req.body.startDate && !req.body.endDate && new Date(req.body.startDate) > new Date(wfh.endDate)) throw 'Invalid Date.'
                    updateById(req, res, next, WFHModel, 'WFH')
                }
                else updateById(req, res, next, WFHModel, 'WFH')
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const getWFH = (req, res, next) => {
    getById(req.params.id, res, next, WFHModel, 'WFH')
}

export const deleteWFH = (req, res, next) => {
    WFHModel.findById(req.params.id)
        .then((wfh) => {
            if (!wfh) throw 'No such WFH'
            if (wfh.status !== "pending") throw `cannot delete this WFH`
            deleteById(req.params.id, res, next, WFHModel, 'WFH')
        })
        .catch((error) => {
            handleCatch(`${error}`, res, 401, next)
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
                            handleCatch(`${error}`, res, 401, next)
                        })
                }
                else throw 'Already rejected.'
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}