import { createLoan, deleteLoanById, filterLoans, getAllLoans, getAllLoansByUserId, getLoanById, updateLoanById } from "../controllers/loan.js";

import  express from "express";

export const loanRoute = express.Router();

loanRoute.route('/loan/new').post(createLoan);
loanRoute.route('/loan/:id').get(getLoanById).delete(deleteLoanById).put(updateLoanById);
loanRoute.route('/loan/user/:id').get(getAllLoansByUserId)
loanRoute.route('/loans/filter').get(filterLoans)
loanRoute.route('/loans/org/:id').get(getAllLoans)

