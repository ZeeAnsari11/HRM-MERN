import mongoose from "mongoose";

//  Schema to Create PaySlip 

const paySlipSchema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basicSalary: {
        type: Number,
        required: true
    },
    grossSalary: {
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
    tax: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'open',
        lowercase: true,
        enum: {
            values: [
                'open',
                'close'
            ],
            messsage: 'Enter a valid status'
        },
        required: true
    },
    absentCost: {
        type: Number,
        required: true
    },
    LeaveAdjustment : {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PaySlipModel = mongoose.model('Payslip', paySlipSchema, 'PaySlip Collection')