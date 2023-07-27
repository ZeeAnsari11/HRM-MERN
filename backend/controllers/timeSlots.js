import { createNew, deleteById, getAll, getById, handleCatch } from "../utils/common.js";

import { TimeSlotsModel } from "../models/timeSlotsSchema.js"
import { response } from "express";

// Create controller function
export const createTimeSlot = (req, res, next) => {
    try {
        if (req.body.startTime == req.body.endTime) { throw new Error ("Start and End time can not be same") }
        if (req.body.break?.startTime == req.body.break?.endTime) { throw new Error ("Start and End time can not be same for break") }
        req.body.startTime =  req.body.startTime;
        req.body.endTime =  req.body.endTime;
        if (req.body.break) {
            req.body.break.startTime =  req.body.break.startTime;
            req.body.break.endTime =  req.body.break.endTime;
        }
        createNew(req, res, next, TimeSlotsModel);
    }
    catch (err) {
        handleCatch(err, res, 400, next)
    }
};

export const updateTimeSlotById = (req, res, next) => {
        TimeSlotsModel.findById(req.params.id)
            .then((slot) => {
                if (!slot) {
                    throw new Error ("Time slot not found");
                }
                if (req.body.startTime && req.body.startTime === slot.endTime) {
                    throw new Error ("New startTime cannot be the same as the current endTime");
                }
                if (req.body.endTime && req.body.endTime=== slot.startTime) {
                    throw new Error ("New endTime cannot be the same as the current startTime");
                }
                if (req.body.break?.startTime && req.body.break?.startTime === slot.break?.endTime) {
                    throw new Error ("New startTime for break cannot be the same as the current endTime for break");
                }
                if (req.body.break?.endTime && req.body.break?.endTime  === slot.break?.startTime ) {
                    throw new Error ("New endTime for break cannot be the same as the current startTime for break");
                }
                if (req.body.startTime && req.body.endTime && req.body.startTime  === req.body.endTime ) {
                    throw new Error ("startTime and endTime cannot be the same");
                }
                if (req.body.break?.startTime && req.body.break?.endTime && req.body.break?.startTime  === req.body.break?.endTime ) {
                    throw new Error ("startTime and endTime for Break cannot be the same");
                }
                TimeSlotsModel.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
                    .then((response) => {
                        res.status(200).json({
                            success: true,
                            message: "Updated Successfully",
                        })
                    })
                    .catch((err) => {  handleCatch(err, res, 500, next) })
            })
            .catch((err) => {  handleCatch(err, res, 400, next)})
};

export const getTimeSlotsByOrganizationId = (req, res, next) => {
    getAll(res, next, TimeSlotsModel, { organization: req.params.id })
};

export const getTimeSlotById = (req, res, next) => {
    getById(req.params.id, res, next, TimeSlotsModel, "TimeSlots")
};

export const deleteTimeSlotById = (req, res, next) => {
    deleteById(req.params.id, res, next, TimeSlotsModel, "TimeSlots")
}