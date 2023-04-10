import  express from "express";
import {deleteLoanRepaymentScheduleById,  updateLoanRepaymentScheduleById } from "../controllers/loanRepayment.js";
export const loanRepaymentRoute = express.Router();

loanRepaymentRoute.route('/loan-repayment-schedule/:id').delete(deleteLoanRepaymentScheduleById).put(updateLoanRepaymentScheduleById);
