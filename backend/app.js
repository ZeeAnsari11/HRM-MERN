import { dirname, join } from 'path';

import { PermssionsRoute } from "./routes/permissions.js";
import { UserModel } from "./models/userSchema.js";
import { addressRoute } from "./routes/address.js";
import { allowanceRoute } from "./routes/allowance.js";
import { assetRevisionRoute } from "./routes/assetsRevisions.js";
import { assetTypeRoute } from "./routes/assetType.js";
import { assetsRoute } from "./routes/assets.js";
import { attendenceRoute } from "./routes/attendance.js";
import { authRoute } from "./routes/auth.js";
import { backgroundShifterRoute } from './routes/backGroundShifter.js';
import { bankRoute } from "./routes/bank.js";
import bodyParser from 'body-parser';
import { branchRoute } from "./routes/branch.js";
import { certificateRoute } from "./routes/certificate.js";
import { commonQuestionsRoute } from "./routes/commonQuestions.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { departmentRoute } from './routes/department.js';
import { designationRoute } from "./routes/designation.js";
import { employmentTypeRoute } from "./routes/employmentType.js";
import { eoeTypeRoute } from "./routes/eoeType.js";
import errorHandler from "./middlewares/errorHandler.js";
import { evaluationRatingRoute } from "./routes/evaluationRatings.js";
import { expenseRoute } from "./routes/expense.js";
import { experienceRoute } from "./routes/experience.js";
import express from "express";
import { fileURLToPath } from 'url';
import fs from 'fs'
import { gradeBenefitsRoute } from "./routes/gradeBenefits.js";
import { gradeRoute } from "./routes/grade.js";
import { handleCatch } from './utils/common.js';
import helmet from "helmet";
import { holidayRoute } from "./routes/holiday.js";
import { leaveRequestRoute } from "./routes/leaveRequest.js";
import { leaveSlabsRoute } from "./routes/leaveSlabs.js";
import { leaveTypeRoute } from "./routes/leaveType.js";
import { loanRepaymentRoute } from "./routes/loanRepayment.js";
import { loanRoute } from "./routes/loan.js";
import { loanTypeRoute } from "./routes/loanType.js";
import { missingPunchesRequestRoute } from "./routes/missingPunches.js";
import multer from "multer"
import { organizationRoute } from "./routes/organization.js";
import path from 'path';
import { paySlipRoute } from "./routes/paySlip.js";
import { permissionsMiddlewre } from "./middlewares/permissions.js";
import { probEvalAttributesRoute } from "./routes/probEvalAttributes.js";
import { probationEvaluationRoute } from "./routes/probationEvaluation.js";
import { qualificationRoute } from "./routes/qualification.js";
import { relativesRoute } from "./routes/relatives.js";
import { requestFlowRoute } from "./routes/requestFlow.js";
import { requestRoute } from "./routes/request.js";
import { requestTypeRoute } from "./routes/requestType.js";
import { salaryRoute } from "./routes/salary.js";
import { shortLeaveTypeRoute } from "./routes/shortLeaveType.js";
import { taxRuleRoute } from "./routes/taxRule.js";
import { themeRoute } from './routes/theme.js';
import { timeSlotsRoute } from "./routes/timeSlots.js";
import { userRoleRoute } from "./routes/userRole.js";
import { userRoute } from './routes/user.js';
import { wfhRoute } from "./routes/wfh.js";

const app = express();
const apiVersion = '/api/v1';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.join('uploads', 'profile');
        fs.mkdirSync(destinationPath, { recursive: true }); // Create the directory if it doesn't exist
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage });

// to upload the profile pic use multer
app.post(`${apiVersion}/upload/:id`, upload.single('profile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const filePath = req.file.path;
    UserModel.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found.' });
            }

            // Delete the existing profile file, if it exists

            if (user.profile) {
                fs.unlink(user.profile, err => {
                    if (err) {
                        res.status(404).json({
                            success : false,
                            error : err
                        })
                    }
                });
            }

            // Update the user's profile with the new file path
            user.profile = filePath;
            return user.save();
        })
        .then(updatedUser => {
            res.status(200).json(
                {
                    message: 'File uploaded successfully and user profile updated.',
                    data : filePath
                });
        })
        .catch(error => {
            console.error('Error uploading file and updating user:', error);
            res.status(500).json({ error: 'An error occurred.' });
        });
});
// app.use(permissionsMiddlewre);

app.use(apiVersion, organizationRoute);
app.use(apiVersion, branchRoute);
app.use(apiVersion, assetsRoute);
app.use(apiVersion, assetRevisionRoute);
app.use(apiVersion, relativesRoute);
app.use(apiVersion, experienceRoute);
app.use(apiVersion, bankRoute);
app.use(apiVersion, departmentRoute);
app.use(apiVersion, userRoute);
app.use(apiVersion, qualificationRoute);
app.use(apiVersion, certificateRoute);
app.use(apiVersion, addressRoute);
app.use(apiVersion, loanTypeRoute);
app.use(apiVersion, loanRoute);
app.use(apiVersion, salaryRoute);
app.use(apiVersion, designationRoute);
app.use(apiVersion, assetTypeRoute);
app.use(apiVersion, employmentTypeRoute);
app.use(apiVersion, eoeTypeRoute);
app.use(apiVersion, probEvalAttributesRoute);
app.use(apiVersion, commonQuestionsRoute);
app.use(apiVersion, evaluationRatingRoute);
app.use(apiVersion, leaveSlabsRoute);
app.use(apiVersion, leaveTypeRoute);
app.use(apiVersion, gradeRoute)
app.use(apiVersion, gradeBenefitsRoute)
app.use(apiVersion, shortLeaveTypeRoute);
app.use(apiVersion, leaveRequestRoute);
app.use(apiVersion, userRoleRoute);
app.use(apiVersion, timeSlotsRoute);
app.use(apiVersion, loanRepaymentRoute);
app.use(apiVersion, authRoute);
app.use(apiVersion, wfhRoute);
app.use(apiVersion, probationEvaluationRoute)
app.use(apiVersion, requestFlowRoute)
app.use(apiVersion, requestTypeRoute)
app.use(apiVersion, gradeRoute)
app.use(apiVersion, requestRoute)
app.use(apiVersion, missingPunchesRequestRoute)
app.use(apiVersion, attendenceRoute)
app.use(apiVersion, allowanceRoute)
app.use(apiVersion, paySlipRoute)
app.use(apiVersion, taxRuleRoute)
app.use(apiVersion, holidayRoute)
app.use(apiVersion, expenseRoute)
app.use(apiVersion, PermssionsRoute)
app.use(apiVersion, themeRoute)
app.use(apiVersion, backgroundShifterRoute)

app.use((err, req, res, next) => {
    errorHandler(err, res, next)
});

export default app;