import mongoose from "mongoose";

const loanTypeSchema = mongoose.Schema({
    type:{
        type : String,
        required : [true, 'Please Enter the Loan Type You want to Create'] ,
        trim : true
    },
    organization : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Organization',
        required : [true,  "Please Enter the Organization"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LoanTypeModel = mongoose.model('LoanType', loanTypeSchema, 'LoanType Collection');