import { AssetTypeModel } from "../models/assetTypeSchema.js";
import { deleteInBulk, getAll, deleteById, checkIsExistAndCreate, updateById, handleCatch, createNew } from "../utils/common.js";
import { OrganizationModel } from "../models/organizationSchema.js";

export const createAssetType = (req, res, next) => {
    try {
        if (req.body.unique_id) throw "unique_id is not required in body"
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw "Organization not found"
                req.body.unique_id = req.body.organization + req.body.type?.replace(/\s/g, "").toLowerCase()
                createNew(req, res, next, AssetTypeModel);
            })
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const deleteAssetTypeById = (req, res, next) => {
    deleteById(req.params.id, res, next, AssetTypeModel, "AssetType");
}

export const UpdateAssetTypeById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.unique_id) throw "You can not update organization, Id of AssetType"
        if (req.body.type) {
            AssetTypeModel.findById(req.params.id)
                .then((assetType) => {
                    if (!assetType) throw "AssetType Not Found"
                    req.body.unique_id = assetType.organization + req.body.type?.replace(/\s/g, "").toLowerCase()
                    updateById(req, res, next, AssetTypeModel, "AssetType Details")
                })
                .catch((err) => { handleCatch(err, res, 401, next)})
        }
        else {
            updateById(req, res, next, DesignationModel, "Designation Details")
        }
    }
    catch (err) { handleCatch(err, res, 401, next)}
}

export const getAllAssetTypeByOrgId = (req, res, next) => {
    getAll(res, next, AssetTypeModel, { organization: req.params.id }, "Asset Type");
}

export const deleteAllAssetTypeByOrgId = (req, res, next) => {
    deleteInBulk(res, next, AssetTypeModel, { organization: req.params.id }, "Asset Type");
}