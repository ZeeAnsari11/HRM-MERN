import { deleteInBulk, handleCatch, updateById } from "../utils/common.js";
import { AssetsRevisionsModel } from "../models/assetsRevisionsSchema.js";

export const createAssetRevision = (organization, date, action, reason, user, description) => {
    let body = {
        organization,
        date,
        action,
        reason,
        user,
        description
    };
   return AssetsRevisionsModel.create(body)
        .then((res) => {
            return res;
        })
        .catch((err) => console.log("==========error while creating a new AssetsRevision"));
}


export const updateAssetRevisionById = (req, res, next) => {
    try {
        if (req.body.reason || req.body.description) updateById(req, res, next, AssetsRevisionsModel, 'AssetRevision')
        else{throw 'You can not update the reason and description'}
        
    }
    catch (err) {
        handleCatch(err, res, 401, next);
    }
}

export const deleteAllAssetsRevisions = (orgId) => {
    deleteInBulk(res, next, AssetsRevisionsModel, { organization: orgId }, 'AssetsRevisions');
}