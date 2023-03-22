import express  from "express";

import { organizationRoute } from "./routes/organization.js";
import { branchRoute } from "./routes/branch.js";
import { assetsRoute } from "./routes/assets.js";
import { relativesRoute } from "./routes/relatives.js";
import { experienceRoute } from "./routes/experience.js"
import { bankRoute } from "./routes/bank.js";
import { departmentRoute } from './routes/department.js'
import { userRoute } from './routes/user.js'
import { qualificationRoute } from "./routes/qualification.js";
import { addressRoute } from "./routes/address.js";
import { certificateRoute } from "./routes/certificate.js";
import { loanTypeRoute } from "./routes/loanType.js";
import { loanRoute } from "./routes/loan.js";
import { salaryRoute } from "./routes/salary.js";
import { designationRoute } from "./routes/designation.js";
import { assetTypeRoute } from "./routes/assetType.js";
import { employmentTypeRoute } from "./routes/employmentType.js";
import { eoeTypeRoute } from "./routes/eoeType.js";
import { probEvalAttributesRoute } from "./routes/probEvalAttributes.js";
import { assetRevisionRoute } from "./routes/assetsRevisions.js";
import { commonQuestionsRoute } from "./routes/commonQuestions.js"; 
import { evaluationRatingRoute } from "./routes/evaluationRatings.js"; 
import { leaveSlabsRoute } from "./routes/leaveSlabs.js";
import { leaveTypeRoute } from "./routes/leaveType.js"; 
import { userRoleRoute } from "./routes/userRole.js";


const app = express();

app.use(express.json());

const apiVersion = '/api/v1';

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
app.use(apiVersion, userRoleRoute);


export default app;