import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please enter the title of designation'],
        trim : true,
    },
    shortForm : {
        type: String,
        required: [true, 'Please enter the ShortForm of designation'],
        lowercase: true,
        validate: /^[^\s]*$/,
        trim : true,
    },
    organization : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    unique_id : {
        type: String,
        trim : true,
        unique : true,
        required : true,
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const DesignationModel = mongoose.model('Designation', designationSchema, 'Designation Collection')