import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
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
                'processing',
                'approved',
                'rejected'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    receipts: [
        {
            type: String  // Assuming receipts are stored as file paths or URLs
        }
    ],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the OrganizationId"]
    },
    descriptionByApprover: {
        type: String
    },
    paymentMethod: {
        type: String,
        lowercase: true,
        enum: {
            values: [
                'manual',
                'salary'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ExpenseModel = mongoose.model('Expense', expenseSchema, 'Expense Collection');