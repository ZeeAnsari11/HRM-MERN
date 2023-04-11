import { WFHModel } from "../models/WFHSchema.js";
import { UserModel } from '../models/userSchema.js'
import { handleCatch, createNew, updateById, getById, deleteById } from '../utils/common.js'

export const creatingWFH = (req, res, next) => {
    try {
        if (!req.body.user || !req.body.startDate || !req.body.endDate || req.body.createdAt) throw 'Invalid Body.'
        UserModel.findById(req.body.user)
            .then((user) => {
                if (!user) throw `No such user ${req.body.organization}`
                if (user.organization.toString() !== req.body.organization) throw 'No such user in organization'
                if (new Date (req.body.startDate) > new Date (req.body.endDate)) throw 'Invalid Date.'
                createNew(req, res, next, WFHModel)
            })
            .catch((error) => {
                handleCatch(`${error}`, res, 401, next)
            })
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const updateWFH = (req, res, next) => {
    try {
        if (req.body.user || req.body.organization || req.body.status || req.body.createdAt) throw 'Invalid Body.'
        if (req.body.startDate || req.body.endDate) {
            WFHModel.findById(req.params.id)
                .then((wfh) => {
                    if (!wfh) throw `No such WFH ${req.params.id}`
                    if (req.body.startDate && req.body.endDate && (new Date (req.body.startDate) > new Date (req.body.endDate))) throw 'Invalid Date.'
                    if (!req.body.startDate && req.body.endDate && new Date (wfh.startDate) > new Date (req.body.endDate)) throw 'Invalid Date.'
                    if(req.body.startDate && !req.body.endDate && new Date (req.body.startDate) > new Date (wfh.endDate)) throw 'Invalid Date.'
                    updateById(req, res, next, WFHModel, 'WFH')
                })
                .catch((error) => {
                    handleCatch(`${error}`, res, 401, next)
                })
        }
        else updateById(req, res, next, WFHModel, 'WFH')
    } catch (error) {
        handleCatch(`${error}`, res, 401, next)
    }
}

export const getWFH = (req, res, next) => {
    getById(req.params.id, res, next, WFHModel, 'WFH')
}

export const deleteWFH = (req, res, next) => {
    deleteById(req.params.id, res, next, WFHModel, 'WFH')
}