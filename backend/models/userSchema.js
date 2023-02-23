import mongoose from "mongoose";

//  Schema to Create User 

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
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
    assets: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets',
        required: true,
    },
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
    }

})

export const UserModel = mongoose.model('User', userSchema, 'User Collection')

