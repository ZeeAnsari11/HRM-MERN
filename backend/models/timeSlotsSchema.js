import mongoose from "mongoose";

const timeSlotsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter the Name of TimeSlot"],
        lowercase: true,
        validate: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/
    },
    startTime: {
        type: Date,
        required: [true, "Please Enter the Start Time of TimeSlot"]
    },
    endTime: {
        type: Date,
        required: [true, "Please Enter the End Time of TimeSlot"]
    },
    isOverNight: {
        type: Boolean,
        default: false
    },
    lateBuffer: {
        type: Number,
        min: 0,
        max: 1440
    },
    earlyBuffer: {
        type: Number,
        min: 0,
        max: 1440
    },
    punchBufferStart: {
        type: Number,
        min: 0,
        max: 1440
    },
    punchBufferEnd: {
        type: Number,
        min: 0,
        max: 1440
    },
    break:
    {
        name: {
            type: String,
            required: [true, "Please Enter the Name of Break"]
        },
        startTime: {
            type: Date,
            required: [true, "Please Enter the Start Time of Break"]
        },
        endTime: {
            type: Date,
            required: [true, "Please Enter the End Time of Break"]
        },
        inclusive: {
            type: Boolean,
            default: true
        }
    }
    ,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the OrganizationId"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const TimeSlotsModel = mongoose.model('TimeSlots', timeSlotsSchema, 'TimeSlots Collection')