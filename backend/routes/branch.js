import express from 'express';
import { createBranch, deleteById, getBranchById, getBranchesByOrganization, loadBranchCollection } from '../controllers/branch.js';

const router = express.Router();

router.route('/branch/new').post(createBranch);
router.route('/branches').get(loadBranchCollection);
router.route('/branch/id/:id').get(getBranchById).delete(deleteById);
router.route('/branch/organization/:id').get(getBranchesByOrganization)

export {router as branch};