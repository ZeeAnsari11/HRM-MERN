import express  from "express";
import { organizationRoute } from "./routes/organization.js";
const app =  express();


app.use(express.json());

app.use('/api/v1',organizationRoute)
export default app;