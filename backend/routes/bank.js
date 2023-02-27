import { createBank, getBanksByUserId, deleteBanksByUserId, updateBankById, deleteBankById} from "../controllers/bank.js";
import express from 'express'

export const bankRoute = express.Router();

bankRoute.route('/bank/new').post(createBank);
bankRoute.route('/bank/user/:id').get(getBanksByUserId).delete(deleteBanksByUserId);
bankRoute.route('/bank/:id').put(updateBankById).delete(deleteBankById);
