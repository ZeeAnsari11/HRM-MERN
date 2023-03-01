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
import { certificateRoute } from "./routes/certificate.js";

const app = express();

app.use(express.json());

const apiVersion = '/api/v1';

app.use(apiVersion, organizationRoute);
app.use(apiVersion, branchRoute);
app.use(apiVersion, assetsRoute);
app.use(apiVersion, relativesRoute);
app.use(apiVersion, experienceRoute);
app.use(apiVersion, bankRoute);
app.use(apiVersion, departmentRoute);
app.use(apiVersion, userRoute);
app.use(apiVersion, qualificationRoute);
app.use(apiVersion, certificateRoute);

export default app;