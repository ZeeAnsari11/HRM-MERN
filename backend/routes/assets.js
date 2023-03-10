import express from "express";
import { createAsset, deleteAssetById, getAssetById, UpdateAssetById , getAssets, filterAssets, AssetManagment, getAssetsAllocatedToUserById, getPreviousHolderByAssetId, getAssetsAllocatedToNonActiveUsers} from "../controllers/assets.js";

export const assetsRoute = express.Router();

assetsRoute.route('/asset/new').post(createAsset)
assetsRoute.route('/asset/management').put(AssetManagment)
assetsRoute.route('/asset/:id').get(getAssetById).delete(deleteAssetById).put(UpdateAssetById)
assetsRoute.route('/assets/organization/:id').get(getAssets)
assetsRoute.route('/assets/non-active-users/organization/:id').get(getAssetsAllocatedToNonActiveUsers)
assetsRoute.route('/assets/filter').get(filterAssets)
assetsRoute.route('/assets/user/:id').get(getAssetsAllocatedToUserById)
assetsRoute.route('/previous-holders/asset/:id').get(getPreviousHolderByAssetId)
