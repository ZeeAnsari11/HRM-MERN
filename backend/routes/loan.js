import  express from "express";
import { createLoan } from "../controllers/loan.js";

export const loanRoute = express.Router();


loanRoute.route('/loan/new').post(createLoan);
loanRoute.route('/loan/:id').get(getLoanById).delete(deleteLoanById).put(updateLoanById);
loanRoute.route('/loan/approved/:org').get(getAllApprovedLoansByOrgId);
loanRoute.route('/loan/non-approved/:org').get(getAllApprovedLoansByOrgId);