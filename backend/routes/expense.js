import  express from "express";
import { createExpense, getExpenseById, deleteExpenseById, updateExpenseById, getAllExpensesByUserId, filterExpenses} from "../controllers/expense.js";

export const expenseRoute = express.Router();

expenseRoute.route('/expense/new').post(createExpense);
expenseRoute.route('/expense/:id').get(getExpenseById).delete(deleteExpenseById).put(updateExpenseById);
expenseRoute.route('/expense/user/:id').get(getAllExpensesByUserId)
expenseRoute.route('/expenses/filter').get(filterExpenses)
