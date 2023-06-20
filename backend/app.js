import express from "express";
import cors from "cors";

import { organizationRoute } from "./routes/organization.js";
import { branchRoute } from "./routes/branch.js";
import { assetsRoute } from "./routes/assets.js";
import { relativesRoute } from "./routes/relatives.js";
import { experienceRoute } from "./routes/experience.js";
import { bankRoute } from "./routes/bank.js";
import { departmentRoute } from './routes/department.js';
import { userRoute } from './routes/user.js';
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
import { gradeRoute } from "./routes/grade.js";
import { gradeBenefitsRoute } from "./routes/gradeBenefits.js";
import { shortLeaveTypeRoute } from "./routes/shortLeaveType.js";
import { leaveRequestRoute } from "./routes/leaveRequest.js";
import { userRoleRoute } from "./routes/userRole.js";
import { timeSlotsRoute } from "./routes/timeSlots.js";
import { loanRepaymentRoute } from "./routes/loanRepayment.js";
import { probationEvaluationRoute } from "./routes/probationEvaluation.js";
import { requestFlowRoute } from "./routes/requestFlow.js";
import { requestTypeRoute } from "./routes/requestType.js";
import { wfhRoute } from "./routes/wfh.js";
import { requestRoute } from "./routes/request.js";
import { missingPunchesRequestRoute } from "./routes/missingPunches.js";
import { attendenceRoute } from "./routes/attendance.js";
import { allowanceRoute } from "./routes/allowance.js";
import { paySlipRoute } from "./routes/paySlip.js";
import { taxRuleRoute } from "./routes/taxRule.js";
import { holidayRoute } from "./routes/holiday.js";
import { expenseRoute } from "./routes/expense.js";
import { PermssionsRoute } from "./routes/permissions.js";
import { permissionsMiddlewre } from "./middlewares/permissions.js";

import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import { authRoute } from "./routes/auth.js";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(helmet())

const apiVersion = '/api/v1';
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


app.use((err, req, res, next) => {
    errorHandler(err, res, next)
});

export default app;