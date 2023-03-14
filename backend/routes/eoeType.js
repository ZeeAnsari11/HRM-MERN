import express from "express";
import {
    creatEOEType, updateEOETypeById, deleteEOETypeById,
    getEOETypeById
} from '../controllers/eoeType.js'

export const eoeTypeRoute = express.Router();

eoeTypeRoute.route('/eoeType/new').post(creatEOEType)
eoeTypeRoute.route('/eoeType/update/:id').put(updateEOETypeById)
eoeTypeRoute.route('/eoeType/delete/:id').delete(deleteEOETypeById)
eoeTypeRoute.route('/eoeType/:id').get(getEOETypeById)