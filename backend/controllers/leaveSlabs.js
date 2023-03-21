import { LeaveSlabsModel } from "../models/leaveSlabsSchema.js";
import { createNew, deleteById, getById, handleCatch, updateById } from '../utils/common.js'


export const createLeaveSlab = (req, res, next) => {
    createNew(req, res, next, LeaveSlabsModel);
}

export const getLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw "Id is required" }
        getById(req.body.id, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const updateLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw "Id is required" }
        req.params.id = req.body.id;
        console.log("=================req.params.id========", req.params.id);
        req.body.id = undefined;
        console.log("=================req.bod========", req.body);
        updateById(req, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const deleteLeaveSlabById = (req, res, next) => {
    try {
        if (!req.body.id) { throw "Id is required" }
        deleteById(req.body.id, res, next, LeaveSlabsModel, "LeaveSlab")
    }
    catch (err) { handleCatch(err, res, 401, next) }
}