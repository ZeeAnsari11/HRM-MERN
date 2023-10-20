import { handleCatch, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { MissingPunchesModel } from "../models/missingPunchesSchema.js"
import { AttendanceModel } from "../models/attendanceSchema.js"
import { creatingRequest } from "../utils/request.js";
import { UserModel } from "../models/userSchema.js";
import { RequestFlowModel } from "../models/requestFlowSchema.js";
import mongoose from "mongoose";

export const createMissingPunchRequest = (req, res, next) => {
    try {
        if (req.body.status) throw new Error("Status is not required");
        if (req.body.expectedTime) {
            AttendanceModel.findOne({ user: req.body.user, date: req.body.date })
                .then((attendanceFound) => {
                    console.log("=======attendanceFound==",attendanceFound);
                    if (!attendanceFound) throw new Error("It might be the off day for which you are generating the request")
                    if (attendanceFound.isPresent) throw new Error("Your attendance is already marked");
                    if ((req.body.punchType == "checkIn" && attendanceFound.checkIn != "false") || (req.body.punchType == "checkOut" && attendanceFound.checkOut != "false")) {
                        throw new Error("Already result found, cannot do this action now");
                    }
                    mongoose.startSession().then((session) => {
                        session.startTransaction();
                        MissingPunchesModel.find({ user: req.body.user, date: req.body.date, punchType: req.body.punchType })
                            .then((alreadyRequested) => {
                                console.log("======alreadyRequested===",alreadyRequested);
                                if (alreadyRequested.length > 0) throw new Error("Already generated request for that");
                                return MissingPunchesModel.create([req.body], { session: session });
                            })
                            .then((missingPunchesRequest) => {
                                UserModel.findById(req.body.user)
                                    .select("_id lineManager organization branch firstName lastName")
                                    .then((user) => {
                                        if (!user) throw new Error('user not found')
                                        return RequestFlowModel.find({ name: "Missing Punches Flow" }).populate({
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
                                                creatingRequest(req, res, next, user, missingPunchesRequest[0], flow._id, flow.requestType._id, "MissingPunches");
                                                session.commitTransaction()

                                            })
                                            .catch((err) => {
                                                session.endSession();
                                                handleCatch(err, res, 400, next);
                                            });
                                    })
                                    .catch((err) => {
                                        handleCatch(err, res, 400, next);
                                    });
                            })
                            .catch((err) => {
                                handleCatch(err, res, 400, next);
                            });
                    })
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

export const filterMissingPunches = (req, res, next)=>{
    const { month, year, userId } = req.query;
    let query = {
        user: userId,
        date: {
          $gte: new Date(year, month - 1, 1), // Start of the month
          $lt: new Date(year, month, 1) // Start of the next month
        }
      }
    getAll(res, next, MissingPunchesModel, query, "Attendence Request history for this user");
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
