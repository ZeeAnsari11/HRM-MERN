import { handleCatch, getById, deleteById, updateById } from "../utils/common.js"
import { MissingPunchesModel } from "../models/missingPunchesSchema.js"
import { AttendanceModel } from "../models/attendanceSchema.js"
import { creatingRequest } from "../utils/request.js";
import { UserModel } from "../models/userSchema.js";
import { RequestModel } from "../models/requestSchema.js";

export const createMissingPunchRequest = (req, res, next) => {
    try {
        if (req.body.status) throw ("Status is not required");
        if (req.body.expectedTime) {
            AttendanceModel.findOne({ user: req.body.user, date: req.body.date })
                .then((attendanceFound) => {
                    console.log("=======attendanceFound===", attendanceFound);
                    if (attendanceFound.isPresent) throw ("Your attendance is already marked");
                    if ((req.body.punchType == "checkIn" && attendanceFound.checkIn != "false") || (req.body.punchType == "checkOut" && attendanceFound.checkOut != "false")) {
                        throw ("Already result found, cannot do this action now");
                    }
                    console.log("======", { user: req.body.user, date: req.body.date, punchType: req.body.punchType });
                    MissingPunchesModel.find({ user: req.body.user, date: req.body.date, punchType: req.body.punchType })
                        .then((alreadyRequested) => {
                            console.log("=====alreadyRequested===", alreadyRequested);
                            if (alreadyRequested.length > 0) throw ("Already generated request for that");
                            return MissingPunchesModel.create(req.body);
                        })
                        .then((missingPunchesRequest) => {
                            UserModel.findById(req.body.user)
                                .select("_id lineManager organization branch firstName lastName")
                                .then((user) => {
                                    creatingRequest(req, res, next, user, missingPunchesRequest, "64552238be486f2a383ff532", "645251d7c62b8094627d8aa1", "MissingPunches");
                                });
                        })
                        .catch((err) => {
                            handleCatch(err, res, 401, next);
                        });
                })
                .catch((err) => {
                    handleCatch(err, res, 401, next);
                });
        } else {
            throw ("Please provide the punch time");
        }
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const getMissingPunchRequest = (req, res, next) => {
    getById(req.params.id, res, next, MissingPunchesModel, "Punch Type")
}

export const deleteMissingPunchRequest = (req, res, next) => {
    MissingPunchesModel.findById(req.params.id)
        .then((punch) => {
            if (punch.status == "pending") {
                deleteById(req.params.id, res, next, MissingPunchesModel)
            }
            else throw "Your request for missing punch is approved / rejected so can not delete it now"
        })
        .catch(err => handleCatch(err, res, 401, next))
}

export const updateMissingPunchRequest = (req, res, next) => {
    MissingPunchesModel.findById(req.params.id)
        .then((punch) => {
            if (punch.status == "pending") {
                updateById(req, res, next, MissingPunchesModel)
            }
            else throw "Your request for missing punch is approved / rejected so can not update it now"
        })
        .catch(err => { handleCatch(err, res, 401, next) })
}
