import { deleteInBulk, handleCatch, updateById } from "../utils/common.js";
import { AssetsRevisionsModel } from "../models/assetsRevisionsSchema.js";

export const createAssetRevision = (organization, date, action, reason, user) => {
    let body = {
        organization,
        date,
        action,
        reason,
        user
    }
    AssetsRevisionsModel.create(body)
        .then(() => console.log("Revision creted Successfully!"));
}


export const updateAssetRevisionById = (req, res, next) => {
    try {
        if (req.body.assset || req.body.organization) throw 'You can not update the asset and organization in assetRevision'
        updateById(req, res, next, AssetsRevisionsModel, 'AssetRevision')
    }
    catch (err) {
        handleCatch(err, res, 401, next);
    }
}

export const deleteAllAssetsRevisions = (orgId) => {
    deleteInBulk(res, next, AssetsRevisionsModel, { organization: orgId }, 'AssetsRevisions');
}