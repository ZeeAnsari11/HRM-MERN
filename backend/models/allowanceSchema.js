import mongoose from "mongoose";

//  Schema to Create Allowance 

const allowanceSchema = mongoose.Schema({
    allowanceName: {
        type: String,
        required: true
    },
    percrentageOfBaseSalary: {
        type: Number,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    unique_id : {
        type: String,
        trim : true,
        unique : true,
        required : true
    }
})

export const AllowanceModel = mongoose.model('Allowance', allowanceSchema, 'Allowance Collection')