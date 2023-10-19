import { createBranch, deleteById, getBranchById, getBranchesByOrganization, getOrganizationByBranchId, loadBranchCollection, updateBranch } from '../controllers/branch.js';

import express from 'express';

export const branchRoute = express.Router();

branchRoute.route('/branch/new').post( createBranch);
branchRoute.route('/branches').get(loadBranchCollection);
branchRoute.route('/branch/:id').get(getBranchById).delete(deleteById).put(updateBranch);
branchRoute.route('/branch/organization/:id').get(getBranchesByOrganization);
branchRoute.route('/organization/branch/:id').get(getOrganizationByBranchId);