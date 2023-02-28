import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
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
        maxlength: [65, 'City name is too long']
    },
    country: {
        type: String,
        required: [true, "Please enter comapanies' Country"],
        maxlength: [65, 'Country name is too long']
    },
    employerName: {
        type: String,
        required: [true, 'Please enter the employer name currently working in the organization'],
        trim : true
    },
    employerDesignation: {
        type: String,
        required: [true, 'Please enter the employer designation in the organization'],
        trim : true
    },
    employerContactNumber: {
        type: String,
        required: [true, 'Please enter the employer contact number in the organization'],
        trim : true
    },
    stack: {
        type: String,
        required: [true, 'Please enter the stack you have experience in'],
    },
    starting: Date,
    ending: Date,
    experienceLetter: {
        type : String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    reasonForLeaving: {
        type: String,
        required: [true, 'Please enter the reason for leaving this organization'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
export const ExperienceModel = mongoose.model('Experience', experienceSchema, 'Experience Collection')