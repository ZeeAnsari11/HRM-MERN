import mongoose from "mongoose";

const leaveTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name of the leave '],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z][ a-zA-Z]+$/
    },
    shortName: {
        type: String,
        required: [true, 'Please enter short name of the leave '],
        trim: true,
        maxLength: [15, 'Cannot exceeds from 15 characters']
    },
    canApplyInProbation: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
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
    canApplyForBackDay: {
        type: Boolean,
        default: false
    },
    buffer: {
        type: Number,
        min: 0,
        max: 31
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
    accumulativeCountOptions: {
        type: String,
        default: 'per year',
        lowercase: true,
        enum: {
            values: [
                'per month',
                'per year'
            ],
            messsage: 'enter a valid accumulative count option',
        },

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
    unique_id: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const LeaveTypeModel = mongoose.model('LeaveType', leaveTypeSchema, 'Leave Type Collection')