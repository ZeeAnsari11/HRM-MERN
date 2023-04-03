import express from 'express';
import { login, logout, forgotPassword, resetPassword, changeUserPassword } from '../controllers/authentication.js';
import { isAuthenticatedUser } from '../middlewares/auth.js';

export const authRoute = express.Router();

authRoute.route('/login').post(login);
authRoute.route('/logout').get(logout);

authRoute.route('/password/forgot').post(forgotPassword);
authRoute.route('/password/reset/:token').put(resetPassword);
authRoute.route('/password/update').put(isAuthenticatedUser,changeUserPassword);