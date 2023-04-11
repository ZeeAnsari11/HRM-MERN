import { OrganizationModel } from "../models/organizationSchema.js";
import { RequestTypeModel } from "../models/requestTypeSchema.js";
import { createNew, deleteById, getAll, getById, handleCatch, updateById } from "../utils/common.js";

// Create a new RequestType
export const createRequestType = (req, res, next) => {
    const { name, organization } = req.body;
    OrganizationModel.findById(organization)
        .then((org) => {
            if (!org) throw "Organization not Found"
            RequestTypeModel.exists({ name: name, organization: organization })
                .then((requestExists) => {
                    if (requestExists) {
                        res.status(400).json({
                            message: "Request Type already exists in the organization"
                        });
                    }
                    else {
                        createNew(req, res, next, RequestTypeModel);
                    }
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
};

// Get all RequestTypes
export const getAllRequestTypes = (req, res, next) => {
    getAll(res, next, RequestTypeModel, { organization: req.params.id }, "RequestType")
};

// Get a RequestType by id
export const getRequestTypeById = (req, res, next) => {
    getById(req.params.id, res, next, RequestTypeModel, "RequestType")
};

// Update a RequestType by id
export const updateRequestType = (req, res, next) => {
    try {
        if (req.body.organization) {
            throw "You cannot Change the organization"
        }
        updateById(req, res, next, RequestTypeModel, 'RequestType')
    } catch (error) {
        handleCatch(error, res, 404, next)
    }
};

// Delete a RequestType by id
export const deleteRequestType = (req, res, next) => {
    deleteById(req.params.id, res, next, RequestTypeModel, "RequestType")
};
