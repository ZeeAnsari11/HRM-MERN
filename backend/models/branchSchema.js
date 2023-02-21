import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter branch name'],
        maxlength: [45, 'Branch name is too long']
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
        type : mongoose.Schema.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const BranchSchema = mongoose.model('Branch', branchSchema);