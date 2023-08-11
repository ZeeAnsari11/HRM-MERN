import mongoose from "mongoose";

const qualificationSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: [true, 'Please enter your institute name'],
        trim : true
    },
    degreeTitle: {
        type: String,
        required: [true, 'Please enter your education/qualification title'],
        trim: true
    },
    isDegreeCompleted: {
        type: Boolean,
        default: false
    },
    starting: {
        type: String,
        required: [true, "Please enter starting date."]
    },
    ending: {
        type: String,
        required: [true, "Please enter ending date."],
        default: "processing"
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
export const QualificationModel = mongoose.model('Qualification', qualificationSchema, 'Qualification Collection')