import mongoose from "mongoose"

const assetsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Asset"],
        trim: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const assetsModel = mongoose.model('Assets', assetsSchema, 'Assets Collection')