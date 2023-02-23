import express from "express";
import { createAsset, deleteAssetById, getAssetById, UpdateAssetById , getAllAssetsOfOrganization, getAllTaxableAssetsOfOrganization} from "../controllers/assets.js";
export const assetsRouter = express.Router();

assetsRouter.route('/asset/new').post(createAsset)
assetsRouter.route('/asset/:id').get(getAssetById).delete(deleteAssetById).put(UpdateAssetById)
assetsRouter.route('/assets/organization/:orgId').get(getAllAssetsOfOrganization)
assetsRouter.route('/assets/taxable/organization/:orgId').get(getAllTaxableAssetsOfOrganization)

