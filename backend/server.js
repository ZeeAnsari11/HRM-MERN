import app from './app.js';
import { connectDatabase } from './configurations/database.js';
import dotenv from 'dotenv'

dotenv.config();

connectDatabase();

app.listen(process.env.PORT,()=>{
    console.log(`server start at ${process.env.PORT} and mode ${process.env.NODE_ENV}`)
})