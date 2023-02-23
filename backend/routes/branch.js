import express from 'express';
import { createBranch, deleteById, getBranchById, getBranchesByOrganization, getOrganizationByBranchId, loadBranchCollection, updateBranch } from '../controllers/branch.js';

export const branchRouter = express.Router();

branchRouter.route('/branch/new').post(createBranch);
branchRouter.route('/branches').get(loadBranchCollection);
branchRouter.route('/branch/:id').get(getBranchById).delete(deleteById).put(updateBranch);
branchRouter.route('/branch/organization/:id').get(getBranchesByOrganization);
branchRouter.route('/organization/branch/:id').get(getOrganizationByBranchId);