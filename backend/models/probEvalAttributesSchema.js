import mongoose from mongoose;
const probEvalAttributesSchema = mongoose.Schema({
    attributes : [
        {
            name : {
                type : String,
                required : true
            },
            overAllEval : {
                type : Number,
                default : 0
            },
            performance : {
                type : Number,
                default : 0
            },
            probFormId :{
                type: mongoose.Schema.Types.ObjectId,
                ref: "ProbEvalForm",
                required: true
            }
        }
    ]
})

export const ProbEvalAttributesModel = mongoose.model('ProbEvalAttributes', probEvalAttributesSchema, 'ProbEvalAttributes Collection')
