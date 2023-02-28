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
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    isLineManager: {
        type: Boolean,
        required: true,
        default: false
    },
    isTeamLead: {
        type: Boolean,
        required: true,
        default: false
    }

})

export const UserModel = mongoose.model('User', userSchema, 'User Collection')