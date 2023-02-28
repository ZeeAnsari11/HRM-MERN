import express  from "express";
import { organizationRoute } from "./routes/organization.js";
import { branchRouter } from "./routes/branch.js";
import { departmentRoute } from './routes/department.js'
import { userRoute } from './routes/user.js'
import { qualificationExperiences } from "./routes/qualificationExperiences.js";

const app = express();

app.use(express.json());

app.use('/api/v1', organizationRoute)
app.use('/api/v1', branchRouter);
app.use('/api/v1', departmentRoute);
app.use('/api/v1', userRoute);
app.use('/api/v1', qualificationExperiences)

export default app;