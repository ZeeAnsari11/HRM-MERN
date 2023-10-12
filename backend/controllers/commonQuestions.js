import { CommonQuestionsModel } from "../models/commonQuestionsSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { createNew, handleCatch } from '../utils/common.js'

export const createCommnQuestion = (req, res, next) => {
    try {
        if (!req.body.organization) throw new Error ('Provide org.')
        if (req.body.commonQuestion.overAllEvaluation || req.body.commonQuestion.performance) throw new Error ('Invalid Body')
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error ('organization dont exist')
                CommonQuestionsModel.find({ organization: req.body.organization })
                    .then((response) => {
                        if (response.length > 0) {
                            let commonQuestion = {
                                "name": req.body.commonQuestion.name
                            }
                            response[0].commonQuestion.push(commonQuestion)
                            response[0].save()
                                .then(() => {
                                    res.status(200).json({
                                        success: true
                                    })
                                })
                                .catch(err => handleCatch(err, res, 500, next))
                        }
                        else createNew(req, res, next, CommonQuestionsModel)
                    })
                    .catch((error) => {
                        handleCatch(error, res, 500, next)
                    })
            })
            
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateCommnQuestionById = (req, res, next) => {
    try {
        if (req.body.organization) throw new Error ("Cannot Update Organization.")
        if (!req.body.id) throw new Error ('Kindly provide organization common question Id')
        if (req.body.commonQuestion.name || req.body.commonQuestion.overAllEvaluation || req.body.commonQuestion.performance) {
            CommonQuestionsModel.find({ commonQuestion: { $elemMatch: { _id: req.body.id } }, organization: req.params.id })
                .then((question) => {
                    if (question.length == 0) throw new Error (`No such Question with id ${req.body.id}`)
                    question[0].commonQuestion.forEach((question) => {
                        if (question._id == req.body.id) {
                            let name = req.body.commonQuestion?.name || question.name
                            let overAllEvaluation = req.body.commonQuestion?.overAllEvaluation || question.overAllEvaluation
                            let performance = req.body.commonQuestion?.performance || question.performance
                            question.name = name
                            question.overAllEvaluation = overAllEvaluation
                            question.performance = performance
                        }
                    });
                    question[0].save()
                        .then(() => {
                            res.status(200).json({
                                success: true
                            })
                        })
                        .catch((error) => {
                            handleCatch(error, res, 500, next)
                        })
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        }
        else throw new Error ('invalid body')
    } catch (error) {
        handleCatch(error, res, 404, next)
    }
}

export const deleteCommnQuestionById = (req, res, next) => {
    try {
        if (!req.body.organization) throw new Error ('Provide org.')
        CommonQuestionsModel.find({ commonQuestion: { $elemMatch: { _id: req.params.id } }, organization: req.body.organization })
            .then((question) => {
                if (question.length == 0) throw new Error (`No such Organization with id ${req.body.organization} or question with id: ${req.params.id}`)
                let newArr = question[0].commonQuestion.filter(object => {
                    return object._id.toString() !== req.params.id.toString();
                });
                question[0].commonQuestion = newArr
                question[0].save()
                    .then(() => {
                        res.status(200).json({
                            success: true,
                            message: `Question with id ${req.params.id} from organization ${req.body.organization} is deleted`
                        })
                    })
                    .catch((error) => {
                        handleCatch(error, res, 500, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getCommnQuestionById = (req, res, next) => {
    try {
        if (!req.body.organization) throw new Error ('Provide org.')
        CommonQuestionsModel.find({ commonQuestion: { $elemMatch: { _id: req.params.id } }, organization: req.body.organization })
            .then((question) => {
                if (question.length == 0) throw new Error (`No such Organization with id ${req.body.organization} or question with id: ${req.params.id}`)
                question[0].commonQuestion.forEach((question) => {
                    if (question._id == req.params.id) {
                        res.status(200).json({
                            success: true,
                            response: question
                        })
                    }
                });
            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })
    } catch (error) {
        handleCatch(error, res, 404, next)
    }
}

export const getCommnQuestionByOrganizationId = (req, res, next) => {
    CommonQuestionsModel.findById(req.params.id).select('commonQuestion')
        .then((commonQuestions) => {
            res.status(200).json({
                success: true,
                commonQuestions
            })
        })
        .catch(err => handleCatch(err, res, 500, next))
}