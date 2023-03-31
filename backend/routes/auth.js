import express from 'express';
import { login, logout } from '../controllers/authentication.js';

export const authRoute = express.Router();

authRoute.route('/login').post(login);
authRoute.route('/logout').get(logout);