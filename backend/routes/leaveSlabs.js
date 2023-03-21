import express from 'express';
import { createLeaveSlab, getLeaveSlabById, updateLeaveSlabById, deleteLeaveSlabById } from '../controllers/leaveSlabs.js';
export const leaveSlabsRoute = express.Router();

leaveSlabsRoute.route('/slab/new').post(createLeaveSlab);
leaveSlabsRoute.route('/slab/id').get(getLeaveSlabById).put(updateLeaveSlabById).delete(deleteLeaveSlabById);
