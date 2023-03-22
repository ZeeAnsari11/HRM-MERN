import mongoose from "mongoose";


const gradeBenefitsSchema = mongoose.Schema({
    name: {
        type: String,
        validate: /^[a-zA-Z ][a-zA-Z ]+$/,
        required: [true, "Please Enter the Name of the Benefit"],
        maxlength: [100, "Benefit Name Can't Exceed 100 Characters"],
        trim: true,
        lowercase: true
    },
    grade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    }],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the OrganizationId"]
    },
    description: {
        type: String,
        trim: true
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const GradeBenefitsModel = mongoose.model('GradeBenefit', gradeBenefitsSchema, 'Grade Benefits Collection');