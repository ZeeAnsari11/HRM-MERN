import  express from "express";
import { createLoan } from "../controllers/loan.js";

export const loanRoute = express.Router();


loanRoute.route('/loan/new').post(createLoan);
bankRoute.route('/loan/:id').get(getLoanById).delete(deleteLoanById).put(updateLoanById);
bankRoute.route('/loan/approved/:org').get(getAllApprovedLoansByOrgId);
bankRoute.route('/loan/non-approved/:org').get(getAllApprovedLoansByOrgId);