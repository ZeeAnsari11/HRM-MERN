import {
    createOrganization,
    deleteLogo,
    deleteOrganizationById,
    getAllOrganizations,
    getOrganizationById,
    updateOrganizationById
} from '../controllers/organization.js';

import { dirname } from 'path';
import express from "express";
import { fileURLToPath } from 'url';
import fs from 'fs'
import multer from "multer"
import path from 'path';

const __filename = fileURLToPath(import.meta.url);


const organizationRoute = express.Router();

organizationRoute.route('/organization/new').post(createOrganization);
organizationRoute.route('/organizations').get(getAllOrganizations);
organizationRoute.route('/organization/:id').get(getOrganizationById).delete(deleteOrganizationById).put(updateOrganizationById);


// To upload the Organization Logo 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join('uploads', 'logos');
        fs.mkdirSync(destinationPath, { recursive: true }); // Create the directory if it doesn't exist
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage });

//  Route to create/ upload the background shifter image

organizationRoute.route('/log/org/:id').post(upload.single('logo'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    let request = {
        body : {logo : filePath},
        params: {
            id: req.params.id // Add the ID to the request parameters
        }
    }
    updateOrganizationById(request, res, next)
})

// To Delete the Organization Logo 

organizationRoute.route('/logo/remove/org/:id').delete(deleteLogo)


export { organizationRoute };