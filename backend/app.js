import express  from "express";
import { organizationRoute } from "./routes/organization.js";
import { branchRouter } from "./routes/branch.js";
import department from './routes/department.js'
import { assetsRouter } from "./routes/assets.js";

const app = express();

app.use(express.json());

app.use('/api/v1', organizationRoute);
app.use('/api/v1', branchRouter);
app.use('/api/v1', department);
app.use('/api/v1', assetsRouter);

export default app;