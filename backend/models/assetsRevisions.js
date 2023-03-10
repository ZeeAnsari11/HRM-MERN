import mongoose from "mongoose";

const AssetsRevisions = new mongoose.Schema({
    asset: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Assets',
        required: true,
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
    }
})

export const AssetsRevisionsModel = mongoose.model('AssetsRevisions', AssetsRevisions, 'Assets Revisions Collection')