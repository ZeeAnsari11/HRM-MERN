import { AssetTypeModel } from "../models/assetTypeSchema.js";
import { deleteInBulk, getAll, deleteById, checkIsExistAndCreate, updateById, handleCatch } from "../utils/common.js";
import { OrganizationModel } from "../models/organizationSchema.js";
export const createAssetType = (req, res, next) => {
    checkIsExistAndCreate(req, res, next, req.body.organization, OrganizationModel, AssetTypeModel, "AssetType");
}

export const deleteAssetTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, AssetTypeModel, "AssetType");
}

export const UpdateAssetTypeById = (req, res, next) => {
    try {
        if (req.body.organization) throw "Can't update an organization";
        updateById(req, res, next, AssetTypeModel, "AssetType");   
    } catch (error) {
        handleCatch(error, res, 401, next);
    }
}

export const getAllAssetTypeByOrgId = (req, res, next) => {
    getAll(res, next, AssetTypeModel, { organization: req.params.id }, "Asset Type");
}

export const deleteAllAssetTypeByOrgId = (req, res, next) => {
    deleteInBulk(res, next, AssetTypeModel, { organization: req.params.id }, "Asset Type");
}