import express  from "express";
import { organizationRoute } from "./routes/organization.js";
import { branchRouter } from "./routes/branch.js";
import department from './routes/department.js'

app.use(express.json());

app.use('/api/v1',organizationRoute)
app.use('/api/v1/', branchRouter);
app.use('/api/v1', department)

export default app;