import mongoose from "mongoose";

const relativeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name of your Relative"],
        maxlength: [100, "Name Can't Exceed 100 Characters"],
        trim: true
    },
    relationship: {
        type: String,
        required: [true, "Please enter Relationship"],
        maxlength: [100, "Relationship can't Exceed 100 Characters"],
        trim: true
    },
    cellNumber: {
        type: String,
        required: [true, "Please enter relatives' cell number."],
        unique: true
    },
    landLineNumber: {
        type: String,
        required: [true, "Please enter relatives' landline number."]
    },
    isDependent: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const RelativeModel = mongoose.model('Relative', relativeSchema, 'Relatives Collection')