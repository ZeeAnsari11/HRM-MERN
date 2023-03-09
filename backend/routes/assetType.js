import  express from "express";
import { createAssetType, deleteAllAssetTypeByOrgId, deleteAssetTypeById, getAllAssetTypeByOrgId, UpdateAssetTypeById } from "../controllers/assetType.js";

export const assetTypeRoute = express.Router();

assetTypeRoute.route('/asset-type/new').post(createAssetType);
assetTypeRoute.route('/asset-type/:id').delete(deleteAssetTypeById).put(UpdateAssetTypeById);
assetTypeRoute.route('/asset-type/organization/:id').get(getAllAssetTypeByOrgId).delete(deleteAllAssetTypeByOrgId);
