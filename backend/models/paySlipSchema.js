import mongoose from "mongoose";

//  Schema to Create PaySlip 

const paySlipSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowance: {
        allowanceDetails: [{
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }]
    },
    finalSalary: {
        type: Number,
        required: true
    },
    month: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PaySlipModel = mongoose.model('Payslip', paySlipSchema, 'PaySlip Collection')