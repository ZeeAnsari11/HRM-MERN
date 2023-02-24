import { createNew, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { AssetsModel } from "../models/assetsSchema.js"
// import { UserModel } from "../models/userSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"

export const createAsset = (req, res, next) => {
    OrganizationModel.findById(req.body.organization)
        .then((org) => {
            if (org) {
                if(req.body.user){
                    UserModel.find({organization: org._id, user :req.body.user})
                    .then((user)=>{
                        if(!user){throw 'User does not belong to that organization'}
                        createNew(req, res, next, AssetsModel);
                    })
                    .catch((err)=>{
                        throw err;
                    })
                }
                else{
                    createNew(req, res, next, AssetsModel)
                }
            }
            else {
                throw 'Organization Do not exist'
            }
        })
        .catch((err) => {
            console.log("=========error==========",err);
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