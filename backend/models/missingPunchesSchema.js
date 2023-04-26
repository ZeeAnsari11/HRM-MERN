const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const missingPunchesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the UserId"]
    },
    date: {
        type: Date,
        required: true
    },
    expectedCheckInTime : {
        type : String
    },
    expectedCheckOutTime : {
        type : String
    },
    punchType:{
        type: String,
        lowercase: true,
        enum: {
            values: [
                'checkIn',
                'checkOut'
            ],
            messsage: 'Please Enter The Punch Type'
        }
    },
    status: {
        type: String,
        lowercase: true,
        default: 'pending',
        enum: {
            values: [
                'pending',
                'approved',
                'rejected'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    description: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    } 
});

export const MissingPunchesModel = mongoose.model('MissingPunches', missingPunchesSchema, 'MissingPunches Collection');

