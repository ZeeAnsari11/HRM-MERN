import mongoose from "mongoose";

const assetTypeSchema = mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Please Enter the Asset Type You want to Create'],
        maxlength: [70, 'Length can not exceed 70 characters'],
        trim: true,
        validate: /^[a-zA-Z0-9 ][a-zA-Z0-9 ]+$/
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, "Please Enter the Organization"]
    },
    unique_id : {
        type: String,
        trim : true,
        unique : true,
        required : true,
        index: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AssetTypeModel = mongoose.model('AssetType', assetTypeSchema, 'AssetType Collection');