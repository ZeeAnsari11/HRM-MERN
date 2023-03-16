import { ProbEvalAttributesModel } from "../models/probEvalAttributesSchema.js";
import {checkIsExistAndCreate, updateById, deleteById, getAll, createNew, handleCatch} from "../utils/common.js"


export const createProbEvalAttribute = (req, res, next) => {
//    checkIsExistAndCreate(req, res, next, req.body.probFormId, ProbationEvaluationModel, ProbEvalAttributesModel, "Form id " );
    createNew(req, res, next, ProbEvalAttributesModel);
}

export const updateProbEvalAttribute = (req, res, next)=>{
    if((req.body.overAllEval || req.body.performance) && Object.keys(req.body).length <= 2){
        updateById(req, res, next, ProbEvalAttributesModel);
    }
    else{
        handleCatch("You can only update Over All Evaluation and Performance", res, 401, next)
    }
}

export const deleteProbEvalAttribute = (req, res, next)=>{
    deleteById(req, res, next, ProbEvalAttributesModel, "Probation Evaluation attribute");
}

export const getAllProbEvalAttributesByFormId = (req, res, next)=>{
    getAll(res, next, ProbEvalAttributesModel, {probFormId : req.params.id},"Such Attributes not found" )
}
