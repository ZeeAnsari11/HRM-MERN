import { LeaveSlabsModel } from "../models/leaveSlabsSchema.js";
import { createNew, deleteById, getById, handleCatch, updateById } from '../utils/common.js'


export const createLeaveSlab = (req, res, next) => {
    createNew(req, res, next, LeaveSlabsModel);
}

export const getLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw new Error ("Id is required")}
        getById(req.body.id, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const updateLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw new Error ("Id is required") }
        req.params.id = req.body.id;
        req.body.id = undefined;
        updateById(req, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 400, next) }
}

export const deleteLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw new Error ("Id is required") }
        deleteById(req.body.id, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 400, next) }
}