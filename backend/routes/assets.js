import express from "express";
import { createAsset, deleteAssetById, getAssetById, UpdateAssetById , getAssets, getTaxAbleAssets, getNonTaxAbleAssets,getAllocatedAssets,getNonAllocatedAssets} from "../controllers/assets.js";

export const assetsRoute = express.Router();

assetsRoute.route('/asset/new').post(createAsset)
assetsRoute.route('/asset/:id').get(getAssetById).delete(deleteAssetById).put(UpdateAssetById)
assetsRoute.route('/assets/organization/:orgId').get(getAssets)
assetsRoute.route('/assets/organization/taxable/:orgId').get(getTaxAbleAssets)
assetsRoute.route('/assets/organization/non-taxable/:orgId').get(getNonTaxAbleAssets)
assetsRoute.route('/assets/organization/allocated/:orgId').get(getAllocatedAssets)
assetsRoute.route('/assets/organization/non-allocated/:orgId').get(getNonAllocatedAssets)