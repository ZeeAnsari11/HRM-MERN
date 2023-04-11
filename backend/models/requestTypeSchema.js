import mongoose from "mongoose";

const requestTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Request Type"],
        trim: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the Organization Id"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const RequestTypeModel = mongoose.model('RequestType', requestTypeSchema, 'Request Type Collection');