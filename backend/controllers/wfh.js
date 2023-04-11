import { WFHModel } from "../models/WFHSchema.js";
import { UserModel } from '../models/userSchema.js'
import { handleCatch, createNew, updateById, getById, deleteById } from '../utils/common.js'

export const creatingWFH = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw `No User Found`
            if (req.body.status) throw 'Invalid Body.'
            if (user.organization.toString() !== req.body.organization) throw 'No such user in organization'
            if (new Date(req.body.startDate) > new Date(req.body.endDate)) throw 'Invalid Date.'
            createNew(req, res, next, WFHModel)
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