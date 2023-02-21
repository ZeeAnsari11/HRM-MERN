import express  from "express";
import { branch } from "./routes/branch.js";

const app =  express();

app.use(express.json());

app.use('/api/v1/', branch)

export default app;