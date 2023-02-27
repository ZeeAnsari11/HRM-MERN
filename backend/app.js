import express  from "express";
import { organizationRoute } from "./routes/organization.js";
import { branchRoute } from "./routes/branch.js";
import department from './routes/department.js'
import { assetsRouter } from "./routes/assets.js";
import { relativesRoute } from "./routes/relatives.js";
import { experienceRoute } from "./routes/experience.js"
const app = express();

app.use(express.json());

app.use('/api/v1', organizationRoute);
app.use('/api/v1', branchRoute);
app.use('/api/v1', department);
app.use('/api/v1', assetsRouter);
app.use('/api/v1', relativesRoute);
app.use('/api/v1', experienceRoute);

export default app;