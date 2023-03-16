import mongoose from "mongoose";
const probEvalAttributesSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim : true
    },
    overAllEval: {
        type: Number,
        default: 0,
        min  :0,
        max : 10
    },
    performance: {
        type: Number,
        default: 0,
        min  :0,
        max : 10
    },
    probFormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProbEvalForm",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const ProbEvalAttributesModel = mongoose.model('ProbEvalAttributes', probEvalAttributesSchema, 'ProbEvalAttributes Collection')
