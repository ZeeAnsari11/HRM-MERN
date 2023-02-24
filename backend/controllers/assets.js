import { createNew, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { AssetsModel } from "../models/assetsSchema.js"
import { UserModel } from "../models/userSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"

export const createAsset = (req, res, next) => {
    OrganizationModel.findById(req.body.organization)
        .then((org) => {
            if (!org) { throw 'Organization Do not exist' }
            createNew(req, res, next, AssetsModel)
        })
        .catch((err) => {
            res.status(401).json({
                success: false,
                error: err
            })
        })
}

export const getAssetById = (req, res, next) => {
    const id = req.params.id;
    getById(id, res, next, AssetsModel, 'Asset')
}

export const deleteAssetById = (req, res, next) => {
    const id = req.params.id;
    deleteById(id, res, next, AssetsModel, 'Asset')
}

export const UpdateAssetById = (req, res, next) => {
    try {
        if (req.body.organization) {
            throw 'You can not update the owner of an asset'
        }
        else {
            if (req.body.user) {
                UserModel.findById(req.body.user)
                    .then((user) => {
                        if (!user) throw "User Not Found"
                        AssetsModel.findById(req.params.id)
                            .then((asset) => {
                                if (!asset) { throw "Asset not Found" }
                                if (user.organization.toString() !== asset.organization.toString()) { throw "Asset and user not belong to same organization" }
                                updateById(req, res, next, AssetsModel, "Asset")
                            })
                            .catch((err) => {
                                res.status(401).json({
                                    success: false,
                                    error: err
                                })
                            })
                    })
                    .catch((err) => {
                        res.status(401).json({
                            success: false,
                            error: err
                        })
                    })
            }
            else {
                updateById(req, res, next, AssetsModel, "Asset")
            }
        }
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err
        })
    }
}

export const getAssets = (req, res, next) => {
    let query = { organization: req.params.orgId };
    getAll(res, next, AssetsModel, query, 'Asset')
}

export const getTaxAbleAssets = (req, res, next) => {
    let query = { organization: req.params.orgId, isTaxAble: true };
    getAll(res, next, AssetsModel, query, 'Taxable Asset')
}
export const getNonTaxAbleAssets = (req, res, next) => {
    let query = { organization: req.params.orgId, isTaxAble: false };
    getAll(res, next, AssetsModel, query, 'Non Taxable Asset')
}
export const getAllocatedAssets = (req, res, next) => {
    let query = { organization: req.params.orgId, isAllocated: true };
    getAll(res, next, AssetsModel, query, 'Allocated Asset')
}
export const getNonAllocatedAssets = (req, res, next) => {
    let query = { organization: req.params.orgId, isAllocated: false };
    getAll(res, next, AssetsModel, query, 'Allocated Asset')
}