import mongoose from 'mongoose';

const leaveSlabsSchema = new mongoose.Schema({
    fromBalance : {
        type: Number,
        required: [true, "Please enter a balance"],
        max : 0
    },
    toBalance : {
        type: Number,
        required: [true, "Please enter a balance"],
        min : 1
    },
    minDays : {
        type: Number,
        required: [true, "Please enter a minimum days"]
    },
    maxDays : {
        type: Number,
        required: [true, "Please enter a maximum days"]
    },
    repeat : {
        type: String,
        required: [true, "Please enter a repeat"]
    },
    deductionType:{
        type: String,
        required: [true, "Please enter a deduction type"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LeaveSlabsModel = mongoose.model('LeaveSlabs', leaveSlabsSchema, 'LeaveSlabs Collection')
