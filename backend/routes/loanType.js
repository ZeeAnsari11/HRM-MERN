import { UpdateLoanTypeById, createLoanType, deleteAllLoanTypeByOrgId, deleteLoanTypeById, getAllLoanTypeByOrgId, getAllLoanTypesByUserDesignation, getLoanTypeById } from "../controllers/loanType.js";

import  express from "express";

export const loanTypeRoute = express.Router();

loanTypeRoute.route('/loan-type/new').post( createLoanType);
loanTypeRoute.route('/loan-type/user/:id').get(getAllLoanTypesByUserDesignation);
loanTypeRoute.route('/loan-type/:id').delete(deleteLoanTypeById).put(UpdateLoanTypeById).get(getLoanTypeById);
loanTypeRoute.route('/loan-type/organization/:id').get( getAllLoanTypeByOrgId).delete(deleteAllLoanTypeByOrgId);
