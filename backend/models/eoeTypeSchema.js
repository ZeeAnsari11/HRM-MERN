import mongoose from "mongoose";

const eoeTypeSchema = mongoose.Schema({
    eoeType: {
        type: String,
        required: [true, "Enter EOE Type"],
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

export const EOETypeModel = mongoose.model('EOEType', eoeTypeSchema, 'EOE Type Collection')