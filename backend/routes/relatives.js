import express from 'express'
import { createRelative, deleteRelative, getAllRelativesByEmployeeID, updateRelative } from '../controllers/relatives';

const relatives = express.Router();

relatives.route('/relatives/new').post(createRelative);
relatives.route('/relatives/employee/:id').get(getAllRelativesByEmployeeID).delete(deleteRelative).put(updateRelative);

export {relatives};