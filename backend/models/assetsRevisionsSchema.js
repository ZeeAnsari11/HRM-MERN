import mongoose from "mongoose";

const AssetsRevisions = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false,
        default: null
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: [true, 'please Enter an organization'],
    },
    action :{
        type: String,
        required: [true, 'please Enter the type of action you want to perform allocate/deallocate'],
        enum: {
            values: [
                'allocate',
                'deallocate',
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    date : {
        type: Date,
        required: [true, 'please Enter the Date']
    },
    reason : {
        type: String,
        required: [true, 'please Enter the Reason'],
        trim : true
    },
    condition  : {
        type : String,
        required : [true, 'Please Enter the Condition'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AssetsRevisionsModel = mongoose.model('AssetsRevisions', AssetsRevisions, 'Assets Revisions Collection')