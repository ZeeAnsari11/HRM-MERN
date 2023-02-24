import mongoose from "mongoose"

const assetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Asset"],
        trim :true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    condition: {
        type: Number,
        required:[true , 'Please Enter the Current Condition of Asset, Out of 10'],
        trim :true,
        max: 10,
        min: 0
    },
    ManufacturedBy: {
        type: String,
        required: [true, 'Please Enter the Manufacturer Name'],
        trim :true
    },
    Model: {
        type: String,
        required: [true, 'Please Enter the Model Name'],
        trim :true
    },
    isTaxAble: {
        type: Boolean,
        default: false
    },
    isAllocated: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        required: [true, 'Please Enter the price of Asset'],
        min: 0
    },
    assetImage: {
        url: {
            type: String
        }
    },
    description: {
        type: String,
        trim :true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AssetsModel = mongoose.model('Assets', assetsSchema, 'Assets Collection')