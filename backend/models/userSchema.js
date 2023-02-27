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
        maxLength: [100, 'Cannot exceeds from 100 characters']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    assets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assets'
        }
    ],
    relatives: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Relatives',
        required: true,
    },
    qualificationAndExperience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QualificationAndExperience',
        required: true,
    },
    bank: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
        required: true,
    },
    isLineManager: {
        type: Boolean,
        required: true,
        default : false
    },
    isTeamLead: {
        type: Boolean,
        required: true,
        default : false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const UserModel = mongoose.model('User', userSchema, 'User Collection')