import mongoose from mongoose;
const ProbEvalAttributesSchema = mongoose.Schema({
    attributes : [
        {
            name : {
                type : String,
                required : true
            },
            overAllEval : {
                type : Number,
                required : true
            },
            performance : {
                type : Number,
                required : true
            },
        }
    ]
})

export const ProbEvalAttributesModel = mongoose.model('ProbEvalAttributes', ProbEvalAttributesSchema, 'ProbEvalAttributes Collection')
