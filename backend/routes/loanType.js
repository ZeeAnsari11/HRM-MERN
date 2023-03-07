import  express from "express";
import { createLoanType, deleteLoanTypeById, getAllLoanTypeByOrgId, UpdateLoanTypeById, deleteAllLoanTypeByOrgId, getLoanTypeById} from "../controllers/loanType.js";

export const loanTypeRoute = express.Router();

loanTypeRoute.route('/loan-type/new').post(createLoanType);
loanTypeRoute.route('/loan-type/:id').delete(deleteLoanTypeById).put(UpdateLoanTypeById).get(getLoanTypeById);
loanTypeRoute.route('/loan-type/organization/:id').get(getAllLoanTypeByOrgId).delete(deleteAllLoanTypeByOrgId);
