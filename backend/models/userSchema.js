import mongoose from "mongoose";

//  Schema to Create User 

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    role: {
        type: String,
        required: [true, 'Please enter user role'],
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true,
    },
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skills'
        }
    ],
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    isLineManager: {
        type: Boolean,
        required: true
    },
    isTeamLead: {
        type: Boolean,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    EOE: {
        type: [{
            date: {
                type: Date,
                default: Date.now
            },
            reason: {
                type: String,
                trim: true,
                required: true
            }

        }]
    },
    rehire: {
        type: [{
            date: {
                type: Date,
                default: Date.now
            },
            reason: {
                type: String,
                trim: true,
                required: true
            }
        }]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const UserModel = mongoose.model('User', userSchema, 'User Collection')