import mongoose from "mongoose";

//  Schema to Create eoeType 

const eoeTypeSchema = mongoose.Schema({
    eoeType: {
        type: String,
        required: [true, "Enter EOE Type"],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
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

export const EOETypeModel = mongoose.model('EOEType', eoeTypeSchema, 'EOE Type Collection')