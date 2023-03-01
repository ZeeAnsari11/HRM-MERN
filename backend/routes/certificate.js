import express from 'express'
import { createCertification, deleteAllCertifications, deleteCertificationById, getAllCertificationByUserID, updateCertification } from '../controllers/certificate.js';

export const certificateRoute = express.Router();

certificateRoute.route('/certificate/new').post(createCertification);
certificateRoute.route('/certificate/:id').delete(deleteCertificationById).put(updateCertification);
certificateRoute.route('/certificate/user/:id').get(getAllCertificationByUserID).delete(deleteAllCertifications);