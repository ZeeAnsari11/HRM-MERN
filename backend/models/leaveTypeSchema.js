import mongoose from "mongoose";

const leaveTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name of the leave '],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    shortName: {
        type: String,
        required: [true, 'Please enter short name of the leave '],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 15 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    canApplyInProbation: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    },
    autoAllotment: {
        type: Boolean,
        default: false
    },
    shortLeave: {
        type: Boolean,
        default: false
    },
    showRemainingCountInPayslip: {
        type: Boolean,
        default: false
    },
    sandwhich: {
        type: Boolean,
        default: false
    },
    splitable: {
        type: Boolean,
        default: false
    },
    proRated: {
        type: Boolean,
        default: false
    },
    carryForward: {
        type: Boolean,
        default: false
    },
    encashment: {
        type: Boolean,
        default: false
    },
    applicable: {
        canApplyForBackDay: {
            type: Boolean,
            default: false
        },
        buffer: {
            type: Date,
            default: null
        }
    },
    attachmentRequired: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        default: 'all',
        lowercase: true,
        enum: {
            values: [
                'all',
                'male',
                'female',
                'others'
            ],
            messsage: 'Enter a valid gender type',
        }
    },
    minimumExperienceToApplyInMonths: {
        type: Number
    },
    maximumApplicationsInEmployment: {
        type: Number
    },
    gapBetweenApplicationsInMonths: {
        type: Number
    },
    accumulativeCount: {
        type: Number,
        required: [true, 'Please provide accumulative account count'],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    unique_id : {
        type: String,
        trim : true,
        unique : true,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LeaveTypeModel = mongoose.model('LeaveType', leaveTypeSchema, 'Leave Type Collection')