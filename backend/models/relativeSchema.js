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
        maxlength: [100, "Organization Address Can't Exceed 100 Characters"],
        trim: true
    },
    phoneNumber: {
        type: String,
        required: [true, "Please enter relatives' phone number."]
    },
    isDependent: {
        type: Boolean,
        default: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

export const RelativeModel = mongoose.model('Relatives', relativeSchema)