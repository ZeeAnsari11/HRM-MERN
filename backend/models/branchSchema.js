import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter branch name'],
        maxlength: [45, 'Branch name is too long'],
        trim: true
    },
    city: {
        type: String,
        required: [true, 'Please enter branch city'],
        maxlength: [65, 'City name is too long']
    },
    country: {
        type: String,
        required: [true, 'Please enter branch Country'],
        maxlength: [65, 'Country name is too long']
    },
    description: {
        type: String,
        required: [true, 'Please enter branch description'],
    },
    manager: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: false
    },
    location: {
        type: {
            type: String,
            default: 'point'
        },
        coordinates: {
            type: Array,
            required: [true, 'Please Enter the Longititude and latitude of the Organization']
        }
    },
    organization: {
        type: mongoose.Schema.ObjectId,
        ref: 'Organization',
        required: true
    },
    unique_id: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        index: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const BranchModel = mongoose.model('Branch', branchSchema, 'Branches Collection')