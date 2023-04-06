import mongoose from "mongoose";

const loanRepaymentSchema = mongoose.Schema({
    rePaymentDate : {
        type: Date,
        required: [true , "Please enter rePaymentDate"]
    },
    rePaymentAmount : {
        type: Number,
        required: [true , "Please enter paymentAmount"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LoanRepaymentModel = mongoose.model('loanRepayment', loanRepaymentSchema, 'loanRepayment Collection');