import { createNew, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { AssetsModel } from "../models/assetsSchema.js"
import { UserModel } from "../models/userSchema.js"
import { AssetTypeModel } from "../models/assetTypeSchema.js"
import { handleCatch } from "../utils/common.js"
import { createAssetRevision } from "./assetsRevisions.js"
import { AssetsRevisionsModel } from "../models/assetsRevisionsSchema.js"

// Create a new asset
export const createAsset = (req, res, next) => {
    try {
        if (req.body.user || req.body.isAllocated == true || req.body.isAllocated == false || req.body.previousHolders) throw 'You can not assign an asset to any user while creating an asset'
        AssetTypeModel.find({ _id: req.body.type, organization: req.body.organization })
            .then((assetTypes) => {
                if (assetTypes.length == 0) { throw 'Organization Don not have your given asset type' }
                createNew(req, res, next, AssetsModel)
            })
            .catch((err) => { handleCatch(err, res, 401, next) })
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

// Update assets all fields except the fields related to the allocation and deallocation of an asset
export const UpdateAssetById = (req, res, next) => {
    let condition = (req.body.organization || req.body.user || req.body.previousHolders || (req.body.isAllocated == true) || req.body.isAllocated == false || req.body.type);
    try {
        if (condition) {
            throw 'You can not update the owner/holder of an asset please user AssetManagment of this'
        }
        updateById(req, res, next, AssetsModel, "Asset")
    }
    catch (err) {
        res.status(401).json({
            success: false,
            error: err
        })
    }
}


//  Peform Allocation and Deallocatio of an asset also create revisions of an asset
export const AssetManagment = (req, res, next) => {
    let condition = (Object.keys(req.body).length > 6 || !req.body.user || !req.body.asset || !req.body.action || !req.body.reason || !req.body.date || !req.body.condition);
    try {
        if (condition) throw "You can only perform Allocation and deallocation operations here with all necessary information"
        UserModel.findById(req.body.user)
            .then(user => {
                if (!user) throw "User Not Found"
                AssetsModel.findById(req.body.asset)
                    .then(asset => {
                        if (!asset) throw "Asset Not Found"
                        if (asset.organization.toString() !== user.organization.toString()) throw "User and Asset not belong to same organization"
                        if (req.body.action.toLowerCase() === "allocate" && asset.isAllocated === false) {
                            asset.isAllocated = true;
                            asset.user = user._id;
                            createAssetRevisionAndUpdateAssetStatus(res, next, user.organization.toString(), new Date(req.body.date), req.body.action.toLowerCase(), req.body.reason, req.body.condition, req.body.user, asset, "Allocated")
                        }
                        else if (req.body.action.toLowerCase() === "deallocate" && asset.isAllocated === true) {
                            asset.isAllocated = false;
                            asset.user = null;
                            createAssetRevisionAndUpdateAssetStatus(res, next, user.organization.toString(), new Date(req.body.date), req.body.action.toLowerCase(), req.body.reason, req.body.condition, req.body.user, asset, "DeAllocated")
                        }
                        else {
                            throw "Invalid Action"
                        }
                    })
                    .catch((err) => { handleCatch(err, res, 401, next) })
            })
    }
    catch (err) {
        handleCatch(err, res, 401, next)
    }
}

// Filter assets on the basis of IsAllocated : true/false or isTaxable : true/false
export const filterAssets = (req, res, next) => {
    try {
        if (!req.query.organization) throw "Organization not specified";
        if (Object.keys(req.query).length > 1) {
            AssetsModel.find(req.query)
                .then((assets) => {
                    if (assets.length == 0) throw "No such asset found"
                    res.status(200).json({
                        success: true,
                        count: assets.length,
                        data: assets
                    })
                })
                .catch(err => handleCatch(err, res, 401, next))
        }
        else {
            throw "Please Specifiy the filter type too"
        }
    }
    catch (err) {
        handleCatch(err, res, 401, next)
    }
}

// Return All the Assets allocated toa user
export const getAssetsAllocatedToUserById = (req, res, next) => {
    getAll(res, next, AssetsModel, { user: req.params.id, isAllocated: true }, 'Asset')
}

// Return the Recorde of users to whom an asset is allocated previously/ return Asset Revision History
export const getPreviousHolderByAssetId = (req, res, next) => {
    let count = 0;
    let notFoundRevision = []
    let result = [];
    AssetsModel.findById(req.params.id)
        .then(asset => {
            if (!asset) throw "Asset not found"
            asset.previousHolders.forEach((revisionId) => {
                AssetsRevisionsModel.find({ _id: revisionId, organization: asset.organization }).populate('user')
                    .then((assetRevision) => {
                        count++;
                        if (assetRevision.length == 0) notFoundRevision.push(revisionId)
                        result.push(assetRevision[0]);
                        if (count == asset.previousHolders.length) {
                            res.status(200).json({
                                success: true,
                                count: result.length - notFoundRevision.length,
                                notFoundRevision: notFoundRevision,
                                data: result
                            })
                        }
                    })
                    .catch(err => handleCatch(err, res, 200, next))
            })
        })
        .catch(err => handleCatch(err, res, 200, next))
}

//  Retunt the List of users that are non-active but still owns an asset
export const getAssetsAllocatedToNonActiveUsers = (req, res, next) => {
    AssetsModel.find({ organization: req.params.id, isAllocated: true }).populate({
        path: 'user',
        match: {
            isActive: false
        }
    })
        .then((assets) => {
            if (assets.length == 0) throw 'You such Asset Found'
            let result = assets.filter((asset) => {
                if (asset.user != null) {
                    return asset.user
                }
            })
            res.status(200).json({
                success: true,
                count: result.length,
                data: result
            })
        })
        .catch(err => handleCatch(err, res, 200, next))
}

// Return all the assets in occupation of an organization
export const getAssets = (req, res, next) => {
    getAll(res, next, AssetsModel, { organization: req.params.id }, 'Asset')
}

// Return an asset details by Id/ and to which user an asset is assigned
export const getAssetById = (req, res, next) => {

    AssetsModel.findById(req.params.id).populate('user')
        .then((asset) => {
            if (!asset) { throw (`Asset Not Found`) }
            else {
                res.status(200).json({
                    success: true,
                    asset
                })
            }
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}

// Delete an asset 
export const deleteAssetById = (req, res, next) => {
    deleteById(eq.params.id, res, next, AssetsModel, 'Asset')
}

// export const deleteAllAssets = (req, res, next) => {
//     let query = { organization: req.params.orgId, isAllocated: false };
//     getAll(res, next, AssetsModel, query, 'Non Allocated Asset')
// }


//  This fuction creates a new Asset revision on allocation and deallcation of an asset alos update the asset
const createAssetRevisionAndUpdateAssetStatus = (res, next, organization, date, action, reason, condition, user, assetRef, msg = "Action Done") => {

    createAssetRevision(organization, date, action, reason, user, condition)
        .then((revision) => {
            assetRef.previousHolders.push(revision._id);
            assetRef.save()
                .then((response) => {
                    res.status(200).json({
                        success: true,
                        message: `${msg} successfully`,
                        data: response
                    })
                })
        })
        .catch(err => {
            handleCatch(err, res, 401, next)
        })
}