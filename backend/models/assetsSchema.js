import mongoose from "mongoose"

const assetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Asset"],
    },
    allocationTime: {
        type: Date,
        required: [true, "Please Enter the Allocation time of Asset"],
    },
    allocatedTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User'
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Branch'
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    condition: {
        type: String,
        required:[true , 'Please Enter the Current Condition of Asset']
    },
    ManufacturedBy: {
        type: String,
        required: [true, 'Please Enter the Manufacturer Name']
    },
    Model: {
        type: String,
        required: [true, 'Please Enter the Model Name']
    },
    isTaxAble: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'Please Enter the price of Asset']
    },
    assetImage: {
        url: {
            type: String
        }
    },
    description: {
        type: String
    }
})

export const assetsModel = mongoose.model('Assets', assetsSchema, 'Assets Collection')