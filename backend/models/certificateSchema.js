import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    instituteName: {
        type: String,
        required: [true, 'Please enter your institute name'],
        trim : true
    },
    certificateTitle: {
        type: String,
        required: [true, 'Please enter your certificate title'],
        trim: true
    },
    certificationYear: {
        type: String,
        required: [true, "Please enter certification year."]
    },
    certificateAttachment: {
        type: String,
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
export const CertificateModel = mongoose.model('Certificate', certificateSchema, 'Certificate Collection')