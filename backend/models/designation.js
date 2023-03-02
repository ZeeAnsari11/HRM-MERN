import mongoose from "mongoose";

const designationSchema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, 'Please enter the title of designation'],
        trim : true,
        unique : true
    },
    shortForm : {
        type: String,
        required: [true, 'Please enter the ShortForm of designation'],
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const DesignationModel = mongoose.model('Designation', designationSchema, 'Designation Collection')