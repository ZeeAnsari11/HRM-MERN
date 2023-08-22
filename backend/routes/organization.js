import {
    createOrganization,
    deleteOrganizationById,
    getAllOrganizations,
    getOrganizationById,
    updateOrganizationById
} from '../controllers/organization.js';

import { OrganizationModel } from '../models/organizationSchema.js';
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
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const destinationPath = path.join('uploads', 'logos');
//         fs.mkdirSync(destinationPath, { recursive: true }); // Create the directory if it doesn't exist
//         cb(null, destinationPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join('uploads', 'logos');
        fs.mkdirSync(destinationPath, { recursive: true }); // Create the directory if it doesn't exist
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname).toLowerCase();
        cb(null, uniqueSuffix + extension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/webp') {
        cb(null, true); // Accept the file
    } else {
        // cb(new Error('Invalid file type. Only PNG and WebP files are allowed.'), false);
        const error = new Error('Invalid file type. Only PNG and WebP files are allowed.');
        cb(error, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

//  Route to create/ upload the background shifter image

organizationRoute.route('/log/org/:id').post(upload.single('logo'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    OrganizationModel.findById(req.params.id)
        .then(org => {
            if (!org) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Delete the existing profile file, if it exists

            if (org.logo !=null) {
                fs.unlink(org.logo, err => {
                    if (err) {
                        res.status(404).json({
                            success: false,
                            error: err
                        })
                    }
                });
            }
            let request = {
                body: { logo: filePath },
                params: {
                    id: req.params.id // Add the ID to the request parameters
                }
            }
            updateOrganizationById(request, res, next)

        })
})



export { organizationRoute };