import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    previousSalary: {
        type: Number,
        required: true
    },
    currentSalary: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
})

export const SalaryModel = mongoose.model('Salary', salarySchema, 'Salary Collection')