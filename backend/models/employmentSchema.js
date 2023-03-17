import mongoose from "mongoose";

const employmentSchema = mongoose.Schema({
    employmentType: {
        type: String,
        required: [true, "Enter Employment Type"],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const EmploymentModel = mongoose.model('Employment', employmentSchema, 'Employment Collection')