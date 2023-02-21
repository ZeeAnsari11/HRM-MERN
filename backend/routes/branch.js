import express from 'express';
import { createBranch, deleteById, getBranchById, loadBranchCollection } from '../controllers/branch.js';

const router = express.Router();

router.route('/branch/new').post(createBranch);
router.route('/branch').get(loadBranchCollection);
router.route('/branch/id/:id').get(getBranchById).delete(deleteById);

export {router as branch};