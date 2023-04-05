import mongoose from "mongoose";
import zk from "../machine.js"

export const connectDatabase = () => {
    console.log("=================1===============");

    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection Established with database.");
        console.log("=================2===============");
        zk;
        console.log("================3===============");
        console.log("================4===============");

    })
    .catch((e) => {console.log('-----------------e---------',e)
        console.log('Database connection Failed!')})
}
