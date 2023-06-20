import { PermissionsModel } from "../models/permissions.js";
import { getAll, handleCatch } from "../utils/common.js";
import mongoose from "mongoose";
export const updatePermissions = (req, res, next) => {
    try {
        let permissionsPromises=[];
        if (req.body.routes?.length > 0) {
            mongoose.startSession().then((session) => {
                session.startTransaction();
                req.body.routes.forEach(route => {
                    permissionsPromises.push(PermissionsModel.findOneAndUpdate({ organization: route.organization, key: route.key },
                        { $set: { permission: route.permission } },
                        { new: true, runValidators: true ,session}))
                });
                Promise.all(permissionsPromises)
                    .then(() => {
                        session.commitTransaction();
                        session.endSession();
                        res.status(200).json({
                            success: true,
                            message: "Permissions updated successfully",
                        });
                    })
                    .catch((err) => {
                        session.abortTransaction();
                        session.endSession();
                        handleCatch(err, res, 500, next);
                    });
            });
        } else {
            throw new Error("Routes in request body is empty");
        }
    } catch (err) {
        handleCatch(err, res, 400, next);
    }
}

export const getPermissionsByOrganizationId = (req, res, next) => {
    getAll(res, next, PermissionsModel, { organization: req.params.id }, "Permissions")
}