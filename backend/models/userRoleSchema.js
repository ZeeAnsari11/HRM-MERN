import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const UserRoleModel = mongoose.model('User Role', userRoleSchema, 'User Role Collection')