import express from "express";
import {
    createAllowance, updateAllowanceById, deleteAllowanceById,
    getAllowanceById, getAllAllowanceByOrganization
} from '../controllers/allowance.js'

export const allowanceRoute = express.Router();

allowanceRoute.route('/allowance/new').post(createAllowance)
allowanceRoute.route('/allowance/update/:id').put(updateAllowanceById)
allowanceRoute.route('/allowance/delete/:id').delete(deleteAllowanceById)
allowanceRoute.route('/allowance/:id').get(getAllowanceById)
allowanceRoute.route('/allowance/all/:id').get(getAllAllowanceByOrganization)