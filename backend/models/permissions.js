import mongoose from "mongoose";

const permissions = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Enter your organization"],
    },
    permission: {
        type: [{
          type: String,
          enum: ['admin', 'user', 'manager'],
        }],
        required: true,
        default: ['admin'],
        lowercase: true,
      },
    key: {
        type: String,
        required: [true, "Enter the key of the route"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const PermissionsModel = mongoose.model("Permissions", permissions, "Permissions Collection")