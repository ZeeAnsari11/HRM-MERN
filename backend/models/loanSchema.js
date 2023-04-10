import mongoose from "mongoose";

const loanSchema = mongoose.Schema({
    loan_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanType',
        required: [true, "Please Enter the LoanType"]
    },
    loan_amount: {
        type: Number,
        required: [true, 'Please Enter the Required Amount']
    },
    required_Date: {
        type: Date,
        required: [true, 'Please Enter the Required Date ']
    },
    attachment: {
        type: String,
    },
    reason: {
        type: String,
        required: [true, 'Please Enter the Reason For Loan']
    },
    status: {
        type: String,
        lowercase: true,
        default: 'pending',
        enum: {
            values: [
                'pending',
                'approved',
                'rejected'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the UserId"]
    },
    repaymentSchedules: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'loanRepayment'
        }
    ],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the OrganizationId"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LoanModel = mongoose.model('Loan', loanSchema, 'Loan Collection');