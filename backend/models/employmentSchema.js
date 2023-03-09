import mongoose from "mongoose";

const employmentSchema = mongoose.Schema({
    employmentType: {
        type: String,
        required: [true, "Enter Employment Type"],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
})

export const EmploymentModel = mongoose.model('Employment', employmentSchema, 'Employment Collection')