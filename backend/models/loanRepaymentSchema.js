import mongoose from "mongoose";
import { LoanModel } from "./loanSchema.js";
const loanRepaymentSchema = mongoose.Schema({
    rePaymentDate: {
        type: Date,
        required: [true, "Please enter rePaymentDate"]
    },
    rePaymentAmount: {
        type: Number,
        required: [true, "Please enter paymentAmount"]
    },
    status: {
        type: String,
        lowercase: true,
        default: 'pending',
        enum: {
            values: [
                'pending',
                'paid'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

loanRepaymentSchema.pre("remove", function (next) {
    LoanModel.findOneAndUpdate(
        { repaymentSchedules: this._id , status: 'pending'},
        { $pull: { repaymentSchedules: this._id }},
        { new: true }
    )
        .then((res) => {
            if (!res) throw "No such loan request exist that contain such loan repayment schedule"
            next()
        }
        )
        .catch((err) => next(err));
});

export const LoanRepaymentModel = mongoose.model('loanRepayment', loanRepaymentSchema, 'loanRepayment Collection');