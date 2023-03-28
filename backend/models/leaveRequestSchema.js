import mongoose from "mongoose";

const leaveRequestSchema = mongoose.Schema({
    leaveType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LeaveType',
        required: [true, "Please Enter the LeaveType"]
    },
    availableLeaves: {
        type: Number
    },
    short: {
        type: Boolean,
        default: false
    },
    shortleaveDetails: {
        shortLeaveDetails: {
            type: String
        },
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        }
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    count: {
        type: Number
    },
    attachment: {
        type: String
    },
    reason: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the UserId"]
    },
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

export const LeaveRequestModel = mongoose.model('LeaveRequest', leaveRequestSchema, 'Leave Request Collection')