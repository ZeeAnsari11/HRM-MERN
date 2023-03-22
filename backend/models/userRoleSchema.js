import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Please enter the ShortForm of designation"],
        lowercase: true,
        validate: /^[a-zA-Z0-9][a-zA-Z0-9-]*$/
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    },
    unique_id : {
        type: String,
        trim : true,
        unique : true,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const UserRoleModel = mongoose.model('User Role', userRoleSchema, 'User Role Collection')