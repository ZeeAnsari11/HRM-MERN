import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: {
            values: [
                'Hourly',
                'Daily',
                'Weekly',
                'Monthly',
                'Yearly',
            ],
            messsage: 'Please Select Salary Type',
            default: 'Monthly'
        }
    },
    NTN: {
        type: String,
        required: [true, "Please enter the NTN number"],
    },
    paymentMethod: {
        type: String,
        enum: {
            values: [
                'Bank',
                'Cash'

            ],
            messsage: 'Please enter a valid payment method',
        },
        required: [true, "Please select payment method"],
    },
    probationSalary: {
        type: String,
        required: [true, "Please enter probation salary."]
    },
    afterProbationSalary: {
        type: String,
        required: [true, "Please enter after problation salary."]
    },
    taxExempted: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const SalaryModel = mongoose.model('Salary', salarySchema, 'Salary Collection')