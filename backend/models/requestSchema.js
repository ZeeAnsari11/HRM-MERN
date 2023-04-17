import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    requests: {
        requestDetails: [{
            nodeId: {
                type: String,
                required: true
            },
            requestId: {
                type: String,
                required: true
            },
            receiverId: {
                type: String,
                required: true
            },
            senderId: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            flowRequestType: {
                type: String,
                required: true
            },
            state: {
                type: Boolean,
                default: false
            },
            createdAt: {
                type: Date,
                required: true
            }
        }]
    },
})

export const RequestModel = mongoose.model('Request', requestSchema, 'Request Collection')