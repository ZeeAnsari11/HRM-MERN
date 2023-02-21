import dotenv from 'dotenv'
import app from './app.js';


//  seting Config File
dotenv.config();

app.listen(process.env.PORT,()=>{
    console.log(`server start at ${process.env.PORT} and mode ${process.env.NODE_ENV}`)
})