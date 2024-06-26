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
    isActive: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null
    },
    condition: {
        type: String,
        required: [true, 'Please Enter the Current Condition of Asset'],
        trim: true
    },
    ManufacturedBy: {
        type: String,
        required: [true, 'Please Enter the Manufacturer Name'],
        trim: true
    },
    Model: {
        type: String,
        required: [true, 'Please Enter the Model Name'],
        trim: true
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
        trim: true
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please Enter the Category']
    },
    previousHolders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AssetsRevisions',
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AssetsModel = mongoose.model('Assets', assetsSchema, 'Assets Collection')