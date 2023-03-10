import { createNew, getById, deleteById, updateById, getAll } from "../utils/common.js"
import { AssetsModel } from "../models/assetsSchema.js"
import { UserModel } from "../models/userSchema.js"
import { AssetTypeModel } from "../models/assetTypeSchema.js"
import { handleCatch } from "../utils/common.js"

export const createAsset = (req, res, next) => {

    if (req.body.user || req.body.isAllocated || req.body.previousHolders) throw 'You can not assign an asset to any user while creating an asset'
    AssetTypeModel.find({ _id: req.body.type, organization: req.body.organization })
        .then((assetTypes) => {
            if (assetTypes.length == 0) { throw 'Organization Don not have your given asset type' }
            createNew(req, res, next, AssetsModel)
        })
        .catch((err) => {
            handleCatch(err, res, 401, next)
        })
}

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

export const AssetManagment = (req, res, next) => {
    let condition = (Object.keys(req.body).length > 3 || !req.body.user || !req.body.asset || !req.body.action);
    try {
        if (condition) throw "You can only perform Allocation and deallocation operations here"
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
                            asset.save()
                                .then((response) => {
                                    res.status(200).json({
                                        success: true,
                                        data: response
                                    })
                                })
                                .catch(err => handleCatch(err, res, 401, next))
                        }
                        else if (req.body.action.toLowerCase() === "de-allocate" && asset.isAllocated === true) {
                            asset.isAllocated = false;
                            asset.user = null;
                            // user.previousAsset.push(asset._id);
                            // user.save();
                            asset.previousHolders.push(user._id);
                            asset.save()
                                .then((response) => {
                                    res.status(200).json({
                                        success: true,
                                        data: response
                                    })
                                })
                                .catch(err => handleCatch(err, res, 401, next))
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

export const getAssetsAllocatedToUserById = (req, res, next) => {
    getAll(res, next, AssetsModel, { user: req.params.id , isAllocated : true}, 'Asset')
}

export const getPreviousHolderByAssetId = (req, res, next) => {
    let count = 0;
    let notFound = []
    let result = [];
    AssetsModel.findById(req.params.id)
        .then(asset => {
            if (!asset) throw "Asset not found"
            asset.previousHolders.forEach((userId) => {
                UserModel.find({ _id: userId, organization: asset.organization }).select('firstName lastName roleType')
                    .then((users) => {
                        count++;
                        if (users.length == 0) notFound.push(userId)
                        result.push(users[0]);
                        if (count == asset.previousHolders.length) {
                            res.status(200).json({
                                success: true,
                                count: result.length - notFound.length,
                                notFoundUsers : notFound,
                                data: result
                            })
                        }
                    })
                    .catch(err => handleCatch(err, res, 200, next))
            })
        })
        .catch(err => handleCatch(err, res, 200, next))
}

export const getAssetsAllocatedToNonActiveUsers = (req, res, next)=>{
    AssetsModel.find({organization: req.params.id, isAllocated:true}).populate({
        path: 'user',
        match : {
            isActive: false
        }
    })
    .then((assets)=>{
        if(assets.length == 0) throw 'You such Asset Found'
        console.log("--------------assets----------",assets);
        let result = assets.filter((asset)=>{
            console.log("========asset=====",asset);
            console.log("========asset.user=====",asset.user);
            if(asset.user != null){
                return asset.user
            }
        })
        console.log("========result=======",result);
        res.status(200).json({
            success: true,
            count: result.length,
            data: result
        })
    })
    .catch(err => handleCatch(err, res, 200, next))
}

export const getAssets = (req, res, next) => {
    getAll(res, next, AssetsModel, { organization: req.params.id }, 'Asset')
}

export const getAssetById = (req, res, next) => {
    getById(req.params.id, res, next, AssetsModel, 'Asset')
}

export const deleteAssetById = (req, res, next) => {
    deleteById(eq.params.id, res, next, AssetsModel, 'Asset')
}

// export const deleteAllAssets = (req, res, next) => {
//     let query = { organization: req.params.orgId, isAllocated: false };
//     getAll(res, next, AssetsModel, query, 'Non Allocated Asset')
// }