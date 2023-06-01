import { handleCatch, getById, deleteById, updateById } from "../utils/common.js"
import { MissingPunchesModel } from "../models/missingPunchesSchema.js"
import { AttendanceModel } from "../models/attendanceSchema.js"
import { creatingRequest } from "../utils/request.js";
import { UserModel } from "../models/userSchema.js";

export const createMissingPunchRequest = (req, res, next) => {
    try {
        if (req.body.status) throw new Error("Status is not required");
        if (req.body.expectedTime) {
            AttendanceModel.findOne({ user: req.body.user, date: req.body.date })
                .then((attendanceFound) => {
                    if (!attendanceFound) throw new Error("It might be the off day for which you are generating the request")
                    if (attendanceFound.isPresent) throw new Error("Your attendance is already marked");
                    if ((req.body.punchType == "checkIn" && attendanceFound.checkIn != "false") || (req.body.punchType == "checkOut" && attendanceFound.checkOut != "false")) {
                        throw new Error("Already result found, cannot do this action now");
                    }
                    MissingPunchesModel.find({ user: req.body.user, date: req.body.date, punchType: req.body.punchType })
                        .then((alreadyRequested) => {
                            if (alreadyRequested.length > 0) throw new Error("Already generated request for that");
                            return MissingPunchesModel.create(req.body);
                        })
                        .then((missingPunchesRequest) => {
                            UserModel.findById(req.body.user)
                                .select("_id lineManager organization branch firstName lastName")
                                .then((user) => {
                                    if (!user) throw new Error('user not found')
                                    creatingRequest(req, res, next, user, missingPunchesRequest, "64552238be486f2a383ff532", "645251d7c62b8094627d8aa1", "MissingPunches");
                                })
                                .catch(err => handleCatch(err, res, 404, next))
                        })
                        .catch((err) => {
                            handleCatch(err, res, 202, next);
                        });
                })
                .catch((err) => {
                    handleCatch(err, res, 400, next);
                });
        } else {
            throw new Error("Please provide the punch time");
        }
    }
    catch (err) { handleCatch(err, res, 400, next) }
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
            else throw new Error("Your request for missing punch is in approved / rejected / processsing state so can not delete it now")
        })
        .catch(err => handleCatch(err, res, 423, next))
}

export const updateMissingPunchRequest = (req, res, next) => {
    MissingPunchesModel.findById(req.params.id)
        .then((punch) => {
            if (!punch) {
                const notFoundError = new Error("Your request for missing not found");
                notFoundError.statusCode = 404;
                throw notFoundError;
            }
            if (punch.status == "pending") {
                updateById(req, res, next, MissingPunchesModel)
            }
            else throw new Error("YYour request for missing punch is in approved / rejected / processsing state so can not Update it now")
        })
        .catch((err) => {
            handleCatch(err, res, err.statusCode || 423, next);
        });
}
