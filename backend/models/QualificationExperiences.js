import mongoose from "mongoose";

const QualificationExperiencesSchema = new mongoose.Schema({
    designation: {
        type: String,
        required: [true, 'Please enter your designation'],
        trim : true
    },
    organization: {
        type: String,
        required: [true, 'Please enter organization name'],
        maxlength: [65, 'Organization name is too long']
    },
    city: {
        type: String,
        required: [true, "Please enter companies' city name"],
        maxlength: [65, 'Country name is too long']
    },
    country: {
        type: String,
        required: [true, "Please enter comapanies' Country"],
        maxlength: [65, 'Country name is too long']
    },
    stack: {
        type: String,
        required: [true, 'Please enter the stack you have experience in'],
    },
    starting: Date,
    ending: Date,
    experienceLetter: {
        type : String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const qualificationExperiencesModel = mongoose.model('QualificationExperiences', QualificationExperiencesSchema, 'Qualification & ExperiencesSchema')