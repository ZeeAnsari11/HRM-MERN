import { OrganizationModel } from '../models/organizationSchema.js';
import { getAll, getById, deleteById, updateById, handleCatch } from '../utils/common.js';
import app from '../app.js';
import expressListEndpoints from "express-list-endpoints";
import { PermissionsModel } from '../models/permissions.js';
import mongoose from "mongoose";

export const createOrganization = (req, res, next) => {
    try {
        if (req.body.userCode?.currentCode >= 0) throw new Error("Can't update current code")
        if (!req.body.restDays) { throw new Error("Rest days are required and must be in between 1 and 7 ") }
        const restDays = [...new Set(req.body.restDays)];
        restDays.forEach(restDay => {
            if (restDay < 0 || restDay > 8) { throw new Error("Rest days must be in between 1 and 7 ") }
        })
        mongoose.startSession().then((session) => {
            session.startTransaction();
            OrganizationModel.create([req.body], { session: session })
                .then((org) => {
                    createPermissionsObjects(org[0]._id, res, next, session)
                })
                .catch((err) => {
                    session.endSession();
                    handleCatch(err, res, 400, next);
                });
        })
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getAllOrganizations = (req, res, next) => {
    getAll(res, next, OrganizationModel)
}

export const getOrganizationById = (req, res, next) => {
    let id = req.params.id;
    getById(id, res, next, OrganizationModel)
}


export const deleteOrganizationById = (req, res, next) => {
    let id = req.params.id;
    deleteById(id, res, next, OrganizationModel)
}

export const updateOrganizationById = (req, res, next) => {
    OrganizationModel.findById(req.params.id)
        .then((response) => {
            if (req.body.userCode.currentCode >= 0) throw new Error("Can't update pre defined code.")
            if (!response) throw new Error(`Organization Not Found`)
            if (req.body.restDays) {
                const restDays = [...new Set(req.body.restDays)];
                restDays.forEach(restDay => {
                    if (restDay < 0 || restDay > 8) { throw new Error("Rest days must be in between 1 and 7 ") }
                })
            }
            req.body.userCode.currentCode = response.userCode.currentCode;
            updateById(req, res, next, OrganizationModel, "Organization")
        })
        .catch((error) => { handleCatch(error, res, 400, next) })
}

const createPermissionsObjects = (organizationId, res, next, session) => {
    const routes = expressListEndpoints(app);
    let permissionsPromises = [];
    // let totalCount = 0;
    // routes.forEach((route) => {
    //   const methodCount = route.methods.length;
    //   totalCount += methodCount;
    // });
    // console.log("============toatl========",totalCount);
    // console.log('Total sum of method counts:', totalCount);
    routes.forEach((route) => {
        const { methods, middlewares } = route;
        methods.forEach((method, index) => {
            const request = {
                organization: organizationId,
                key: middlewares[index]
            };
            permissionsPromises.push(PermissionsModel.create([request], { session: session }));
        });
    });

    Promise.all(permissionsPromises)
        .then(() => {
            session.commitTransaction();
            res.status(200).json({
                success: true,
                message: "Organization created successfully",
            });
        })
        .catch((err) => {
            session.endSession();
            handleCatch(err, res, 400, next);
        });
};


