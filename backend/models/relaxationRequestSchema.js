import mongoose from "mongoose";

const relaxationRequestSchema = mongoose.Schema({
    Date: {
        type: Date,
        required: true
    },
    expectedCheckinTime: {
        type: Date,
        required: true
    },
    expectedCheckoutTime: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const RelaxationRequestModel = mongoose.model('RelaxationRequest', relaxationRequestSchema, 'Relaxation Request Collection')