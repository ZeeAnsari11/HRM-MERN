import { LeaveTypeModel } from "../models/leaveTypeSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js"
import { handleCatch, createNew, updateById, checkIsExistAndCreate } from '../utils/common.js'

//// Create New Leave Type ////
export const createNewLeaveType = (req, res, next) => {
    try {
        if (req.body.unique_id || !req.body.organization || !req.body.name) throw new Error ("Invalid Body.")
        req.body.unique_id = req.body.organization + req.body.name.replace(/\s/g, "").toLowerCase()
        if ((req.body.canApplyForBackDay == true && !req.body.buffer) || (req.body.canApplyForBackDay == undefined && req.body.buffer)) throw new Error ('kindly provide Buffer and canApplyForBackDay')
        checkIsExistAndCreate(req, res, next, req.body.organization, OrganizationModel, LeaveTypeModel, "Organization")
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// Change Leave Status (active / de-active) By Id ////
export const changeLeaveStatusById = (req, res, next) => {
    try {
        if ((req.body.status == true || req.body.status == false) && Object.keys(req.body).length == 1) {
            LeaveTypeModel.findById(req.params.id)
                .then((leaveType) => {
                    if (!leaveType) {
                    const notFoundError = new Error("leaveType not found");
                    notFoundError.statusCode = 404;
                    throw notFoundError;
                    }
                    if (leaveType.active == req.body.status) throw new Error (`Leave type already on this status ${req.body.status}`)
                    leaveType.active = req.body.status
                    leaveType.save()
                        .then((response) => {
                            res.status(200).json({
                                success: true,
                                response
                            })
                        })
                        .catch((error) => {
                            handleCatch(error, res, 500, next)
                        })
                })
                .catch((err) => {
                    handleCatch(err, res, err.statusCode || 409, next);
                });
        }
        else throw new Error ('Invalid body')
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// Update Leave Type By Id ////
export const updateLeaveTypeById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.active) throw new Error ('Invalid Body')
        if ((req.body.canApplyForBackDay == true && !req.body.buffer) || (req.body.canApplyForBackDay == undefined && req.body.buffer)) throw new Error ('kindly provide Buffer and canApplyForBackDay')
        LeaveTypeModel.findById(req.params.id)
            .then((leaveType) => {
                if (!leaveType) throw new Error ('No such leaveType');
                if (req.body.name) {
                    req.body.unique_id = leaveType.organization + req.body.name.replace(/\s/g, "").toLowerCase();
                    updateById(req, res, next, LeaveTypeModel, 'Leave Type');
                }
                else if (req.body.shortLeaveType) {
                    leaveType.shortLeaveType.forEach((shrtLeaveType) => {
                        if (req.body.name) {
                            req.body.unique_id = leaveType.organization + req.body.name.replace(/\s/g, "").toLowerCase();
                        }
                        if (shrtLeaveType._id == req.body.id) {
                            reh.reason = req.body.reason
                        }
                    });
                    leaveType.save()
                        .then((response) => {
                            res.status(200).json({
                                success: true,
                                response: response
                            })
                        })
                        .catch((error) => {
                            handleCatch(error, res, 500, next)
                        })
                }
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })

        // else updateById(req, res, next, LeaveTypeModel, 'Leave Type')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

//// Get Leave Type By Id ////
export const getLeaveTypeById = (req, res, next) => {
    LeaveTypeModel.findById(req.params.id)
        .then((leaveType) => {
            if (!leaveType) throw new Error ('No such leaveType')
            res.status(200).json({
                success: true,
                response: leaveType
            })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

//// Get filter Leave Types By Organization Id ////
export const filterLeaveTypes = (req, res, next) => {
    try {
        if (!req.query.organization) throw new Error ("Organization not specified");
        if (Object.keys(req.query).length > 1) {
            LeaveTypeModel.find(req.query)
                .then((leaveTypes) => {
                    if (leaveTypes.length == 0) throw new Error ("No such leaveTypes/organization found")
                    res.status(200).json({
                        success: true,
                        count: leaveTypes.length,
                        data: leaveTypes
                    })
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        }
        else throw new Error( "Please Specifiy the filter type too")

    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}