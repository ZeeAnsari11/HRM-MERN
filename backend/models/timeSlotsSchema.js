import mongoose from "mongoose"; 

const timeSlotsSchema = mongoose.Schema({
    status: {
        type: String,
        enum: ['temporary', 'permanent'],
        required: [true, 'Select valid time slot status']
    },
    startTime: {
        type: Date,
        required: [true, 'Enter starting time']
    },
    endTime: {
        type: Date,
        required: [true, 'Enter ending time']
    },
    Days: {
        type: Map,
        of: Boolean,
        required: [true, 'Select valid days']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const TimeSlotSchema = mongoose.model('TimeSlots', timeSlotsSchema, 'TimeSlots Collection')