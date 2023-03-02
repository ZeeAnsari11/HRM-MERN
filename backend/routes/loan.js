import  express from "express";
import { createLoan } from "../controllers/loan.js";

export const loanRoute = express.Router();


loanRoute.route('/loan/new').post(createLoan);
