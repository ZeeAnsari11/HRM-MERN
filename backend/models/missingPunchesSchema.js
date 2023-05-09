import mongoose from 'mongoose';

const missingPunchesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Please Enter the UserId"]
    },
    date: {
        type: Date,
        required: true
    },
    expectedTime : {
        type : String,
    },
    punchType:{
        type: String,
        enum: {
            values: [
                'checkIn',
                'checkOut'
            ],
            messsage: 'Please Enter The Punch Type'
        },
        required: true
    },
    status: {
        type: String,
        lowercase: true,
        default: 'pending',
        enum: {
            values: [
                'pending',
                'processing',
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

