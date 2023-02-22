import express  from "express";
import { branchRouter } from "./routes/branch.js";

const app =  express();

app.use(express.json());

app.use('/api/v1/', branchRouter);

export default app;