import mongoose from "mongoose";

const shortLeaveTypeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        required: [true, 'Please Enter Short Leave Name']
    },
    balance: {
        type: Number,
        min: 0.2,
        max: 1,
        required: true
    },
    shiftReductionInPercentage: {
        type: Number,
        min: 20,
        max: 100,
        required: true
    },
    unique_id: {
        type: String,
        trim: true,
        unique: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ShortLeaveTypeModel = mongoose.model('ShortLeaveType', shortLeaveTypeSchema, 'Short Leave Type Collection')