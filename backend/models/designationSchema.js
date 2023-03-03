import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please enter the title of designation'],
        trim : true,
    },
    shortForm : {
        type: String,
        validate:/^\S*$/,
        required: [true, 'Please enter the ShortForm of designation'],
        uppercase : true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    organization : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    designationKey : {
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

export const DesignationModel = mongoose.model('Designation', designationSchema, 'Designation Collection')