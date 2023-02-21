import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connection Established with database.");
    })
    .catch((e) => console.log('Database connection Failed!'))
}