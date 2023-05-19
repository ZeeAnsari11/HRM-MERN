import mongoose from "mongoose";

const attendanceSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    isPresent: {
        type: Boolean
    },
    isAbsent: {
        type: Boolean,
        default: false
    },
    isLateArrival: {
        type: Boolean
    },
    lateArrivalTime: {
    },
    isEarlyArrival: {
        type: Boolean
    },
    earlyArrivalTime: {
        type: Number,
    },
    isEarlyLeft: {
        type: Boolean
    },
    earlyLeftTime: {
        type: Number
    },
    isLateLeft: {
        type: Boolean
    },
    lateLeftTime: {
        type: Number
    },
    checkIn: {
        type: String,
        default: false,
    },
    checkOut: {
        type: String,
        default: false,
    },
    workedMinutes: {
        type: Number,
    },
    onLeave: {
        type: String,
        required: [true, "Please Select Leave Type"],
        enum: {
            values: [
                'full-paid',
                'full-unpaid',
                'short-paid',
                'short-unpaid',   
                'no'
            ],
            messsage: 'Please Select Leave Type'
        },
        default : "no"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const AttendanceModel = mongoose.model("Attendance", attendanceSchema, "Attendance Collection");
