import express  from "express";
import department from './routes/department.js'
const app =  express();

app.use(express.json());
app.use('/api/v1', department)

export default app;