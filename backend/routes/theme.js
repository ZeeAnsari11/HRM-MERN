import { createThemeConfiguration, deleteThemeConfiguration, getThemeConfiguration, updateThemeConfiguration } from '../controllers/theme.js';

import express from 'express'

export const themeRoute = express.Router();

themeRoute.route('/theme/new').post(createThemeConfiguration);
themeRoute.route('/theme/org/:id').delete(deleteThemeConfiguration).put(updateThemeConfiguration).get(getThemeConfiguration);