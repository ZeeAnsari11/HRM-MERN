import {
    createAllowance,
    deleteAllowanceById,
    getAllAllowanceByOrganization,
    getAllowanceById,
    updateAllowanceById
} from '../controllers/allowance.js'

import express from "express";

export const allowanceRoute = express.Router();

allowanceRoute.route('/allowance/new').post(createAllowance)
allowanceRoute.route('/allowance/:id').put(updateAllowanceById).delete(deleteAllowanceById)
allowanceRoute.route('/allowance/:id').get(getAllowanceById)
allowanceRoute.route('/allowance/all/:id').get(getAllAllowanceByOrganization)