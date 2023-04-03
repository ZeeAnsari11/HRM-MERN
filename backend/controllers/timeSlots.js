import { response } from "express";
import { TimeSlotsModel } from "../models/timeSlotsSchema.js"
import { createNew, getAll, getById, handleCatch } from "../utils/common.js";
// Create controller function
const placeHolder = '0001-01-01T';
export const createTimeSlot = (req, res, next) => {
    try {
        if (req.body.startTime == req.body.endTime) { throw "Start and End time can not be same" }
        if (req.body.break.startTime == req.body.break.endTime) { throw "Start and End time can not be same for break" }
        req.body.startTime = new Date(placeHolder + req.body.startTime);
        req.body.endTime = new Date(placeHolder + req.body.endTime);
        if (req.body.break) {
            req.body.break.startTime = new Date(placeHolder + req.body.break.startTime);
            req.body.break.endTime = new Date(placeHolder + req.body.break.endTime);
        }
        createNew(req, res, next, TimeSlotsModel);
    }
    catch (err) {
        handleCatch(err, res, 401, next)
    }
};

export const updateTimeSlotById = (req, res, next) => {
    try {
        TimeSlotsModel.findById(req.params.id)
            .then((slot) => {
                if (!slot) {
                    throw ("Time slot not found");
                }
                if (req.body.startTime) {
                    req.body.startTime = new Date(placeHolder + req.body.startTime);
                }
                if (req.body.endTime) {
                    req.body.endTime = new Date(placeHolder + req.body.endTime);
                }
                if (req.body.break?.startTime) {
                    req.body.break.startTime = new Date(placeHolder + req.body.break.startTime);
                }
                if (req.body.break?.endTime) {
                    req.body.break.endTime = new Date(placeHolder + req.body.break.endTime);
                }
                if (req.body.startTime && req.body.startTime.getTime() === slot.endTime.getTime()) {
                    throw ("New startTime cannot be the same as the current endTime");
                }
                if (req.body.endTime && req.body.endTime.getTime() === slot.startTime.getTime()) {
                    throw ("New endTime cannot be the same as the current startTime");
                }
                if (req.body.break?.startTime && req.body.break?.startTime.getTime() === slot.break?.endTime.getTime()) {
                    throw ("New startTime for break cannot be the same as the current endTime for break");
                }
                if (req.body.break?.endTime && req.body.break?.endTime.getTime() === slot.break?.startTime.getTime()) {
                    throw ("New endTime for break cannot be the same as the current startTime for break");
                }
                if (req.body.startTime && req.body.endTime && req.body.startTime.getTime() === req.body.endTime.getTime()) {
                    throw ("startTime and endTime cannot be the same");
                }
                if (req.body.break?.startTime && req.body.break?.endTime && req.body.break?.startTime.getTime() === req.body.break?.endTime.getTime()) {
                    throw ("startTime and endTime for Break cannot be the same");
                }
                TimeSlotsModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
                    .then((response) => {
                        res.status(200).json({
                            success: true,
                            message: "Updated Successfully",
                        })
                    })
                    .catch((err) => { handleCatch(err, res, 401, "TimeSlot") })
            })
            .catch((err) => { handleCatch(err, res, 401, "TimeSlot") })
    }
    catch (err) { handleCatch(err, res, 401, "Time") }
};

export const getTimeSlotsByOrganizationId = (req, res, next) => {
    getAll(res, next, TimeSlotsModel, { organization: req.params.id })
};

export const getTimeSlotById = (req, res, next) => {
    getById(req.params.id, res, next, TimeSlotsModel, "TimeSlots")
};