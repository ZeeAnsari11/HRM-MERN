import express from 'express';
import { createBranch, loadBranchCollection } from '../controllers/branch.js';

const router = express.Router();

router.route('/branch/new').post(createBranch);
router.route('/branch').get(loadBranchCollection);

export {router as branch};