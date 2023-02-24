import express from "express";
import { createAsset, deleteAssetById, getAssetById, UpdateAssetById , getAssets, getTaxAbleAssets, getNonTaxAbleAssets,getAllocatedAssets,getNonAllocatedAssets} from "../controllers/assets.js";

export const assetsRouter = express.Router();

assetsRouter.route('/asset/new').post(createAsset)
assetsRouter.route('/asset/:id').get(getAssetById).delete(deleteAssetById).put(UpdateAssetById)
assetsRouter.route('/assets/organization/:orgId').get(getAssets)
assetsRouter.route('/assets/organization/taxable/:orgId').get(getTaxAbleAssets)
assetsRouter.route('/assets/organization/non-taxable/:orgId').get(getNonTaxAbleAssets)
assetsRouter.route('/assets/organization/allocated/:orgId').get(getAllocatedAssets)
assetsRouter.route('/assets/organization/non-allocated/:orgId').get(getNonAllocatedAssets)