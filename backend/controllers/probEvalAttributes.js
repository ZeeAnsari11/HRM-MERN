import { ProbEvalAttributesModel } from "../models/probEvalAttributesSchema.js";
import {createNew, updateById, deleteById} from "../utils/common.js"


export const createProbEvalAttribute = (req, res, next) => {
   createNew(res, res, next, ProbEvalAttributesModel);
}

export const updateProbEvalAttribute = (req, res, next)=>{
    if(req.body.overAllEval || req.body.performance){
        updateById(req, res, next, ProbEvalAttributesModel);
    }
}

export const deleteProbEvalAttribute = (req, res, next)=>{
    deleteById(req, res, next, ProbEvalAttributesModel, "Probation Evaluation attribute");
}
