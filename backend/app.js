import express  from "express";
import { organizationRoute } from "./routes/organization.js";

import { branchRoute } from "./routes/branch.js";
import { assetsRoute } from "./routes/assets.js";
import { relativesRoute } from "./routes/relatives.js";
import { experienceRoute } from "./routes/experience.js"
import { bankRoute } from "./routes/bank.js";
import { departmentRoute } from './routes/department.js'
import { userRoute } from './routes/user.js'
import { qualificationExperiences } from "./routes/qualificationExperiences.js";

const app = express();

app.use(express.json());

app.use('/api/v1', organizationRoute);
app.use('/api/v1', branchRoute);
app.use('/api/v1', assetsRoute);
app.use('/api/v1', relativesRoute);
app.use('/api/v1', experienceRoute);
app.use('/api/v1', bankRoute);
app.use('/api/v1', organizationRoute)
app.use('/api/v1', departmentRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', qualificationExperiences)

export default app;