import  express from "express";
import { createLoan, getLoanById, deleteLoanById, updateLoanById, getAllLoansByUserId, filterLoans} from "../controllers/loan.js";

export const loanRoute = express.Router();

loanRoute.route('/loan/new').post(createLoan);
loanRoute.route('/loan/:id').get(getLoanById).delete(deleteLoanById).put(updateLoanById);
loanRoute.route('/loan/user/:id').get(getAllLoansByUserId)
loanRoute.route('/loans/filter').get(filterLoans)
