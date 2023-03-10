import { UserRoleModel } from "../models/userRoleSchema.js";
import { checkIsExistAndCreate, deleteById, getAll, handleCatch, updateById } from "../utils/common.js";
import { OrganizationModel } from "../models/organizationSchema.js";

export const createUserRole = (req, res, next) => {
    checkIsExistAndCreate(req, res, next, req.body.organization, OrganizationModel, UserRoleModel, 'User Role');
}

export const getAllUserRolesByOrganizationID = (req, res, next) => {
    getAll(res, next, UserRoleModel, { organization: req.params.id }, 'User Role');
}

export const updateUserRole = (req, res, next) => {
    try {
        if (req.body.organization) throw "Can not assign pre-asigned salary to another user."
        updateById(req, res, next, UserRoleModel, 'User Role');
    }
    catch (error) {
        handleCatch(error, res, 401, next);
    }
}

export const deleteUserRole = (req, res, next) => {
    deleteById(req.params.id, res, next, UserRoleModel, 'User Role');
}