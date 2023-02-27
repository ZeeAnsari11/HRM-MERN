import { BankModel } from "../models/bankSchema.js";
import { createBank, getBankByUserId, deleteBankByUserId, updateBankById, deleteBankById} from "../controllers/bank.js";
import express from 'express'

export const bankRoute = express.Router();

bankRoute.route('/bank/new').post(createBank);
bankRoute.route('/bank/user/:id').get(getBankByUserId).delete(deleteBankByUserId);
bankRoute.route('/bank/:id').put(updateBankById).delete(deleteBankById);
