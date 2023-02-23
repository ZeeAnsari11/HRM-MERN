import { createNew, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { AssetsModel } from "../models/assetsSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"

export const createAsset = (req, res, next) => {

    OrganizationModel.findById(req.body.organization)
        .then((organization) => {
            if (organization) {
                createNew(req, res, next, AssetsModel)
            }
            else {
                throw 'Organization Do not exist'
            }
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
    getById(id, res, next, AssetsModel)
}

export const deleteAssetById = (req, res, next) => {
    const id = req.params.id;
    deleteById(id, res, next, AssetsModel)
}

export const UpdateAssetById = (req, res, next) => {
    try {
        if (req.body.organization) {
            throw 'You can not update the owner of an asset'
        }
        else { updateById(req, res, next, AssetsModel) }
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err
        })
    }
}

export const getAllAssetsOfOrganization = (req, res, next) => {

    let query = {organization: req.params.orgId};
    getAll(res,next,AssetsModel,query)
}

export const getAllTaxableAssetsOfOrganization = (req, res, next)=>{
    let query = {organization: req.params.orgId, isTaxAble : true};
    getAll(res,next,AssetsModel,query)
}