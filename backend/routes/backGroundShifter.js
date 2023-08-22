import { createShifterImg, deleteBG_ShiftersByName, getAllBG_Shifters } from '../controllers/backGroundShifter.js';

import { dirname } from 'path';
import express from "express";
import { fileURLToPath } from 'url';
import fs from 'fs'
import multer from "multer"
import path from 'path';

export const backgroundShifterRoute = express.Router();


const __filename = fileURLToPath(import.meta.url);

// To upload the background shifter images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join('uploads', 'bgShifter');
        fs.mkdirSync(destinationPath, { recursive: true }); // Create the directory if it doesn't exist
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage });

//  Route to create/ upload the background shifter image

backgroundShifterRoute.route('/bg-shifter').post(upload.single('bgShifter'), (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    let request = {
        body : {imgAddress : filePath}
    }
    createShifterImg(request, res, next)

})

backgroundShifterRoute.route('/bg-shifters').get(getAllBG_Shifters)
backgroundShifterRoute.route('/bg-shifter/remove').delete(deleteBG_ShiftersByName)




