import mongoose from "mongoose";

const loanSchema = mongoose.Schema({
    loan_type: {
        type: String,
        required: [true, "Please Select Address Type"],
        trim : true,
        uppercase: true
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the UserId"]
    },
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