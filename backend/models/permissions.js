import mongoose from "mongoose";

const permissions = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Enter your organization"],
    },
    key: {
        type: String,
        required: [true, "Enter the key for route"]
    },
    permission: {
        type: [String],
        required: true
    },
    nameOfRoute: {
        type: String,
        required: [true, "Enter the name of the route"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PermissionsModel = mongoose.model("Permissions", permissions, "Permissions Collection")