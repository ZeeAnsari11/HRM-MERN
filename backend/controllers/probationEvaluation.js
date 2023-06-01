import { OrganizationModel } from "../models/organizationSchema.js";
import { ProbationEvaluationModel } from "../models/probationEvaluationSchema.js";
import { UserModel } from "../models/userSchema.js";
import { createNew, deleteById, getById, handleCatch, updateById } from "../utils/common.js";


// CREATE 
export const createProbationEvaluation = (req, res, next) => {
    try {
        if (req.body.createdAt) throw new Error ("You can't Provide CreatedAt")
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw new Error ("Invalid Organization ID")
                UserModel.findById(req.body.user)
                    .then((user) => {
                        if (!user) throw new Error ("Invalid User or Organization")
                        if (req.body.organization != user.organization.toString()) throw new Error ("User Does Not belong to this organization")
                        ProbationEvaluationModel.exists({ user: req.body.user })
                            .then((formExists) => {
                                if (formExists){
                                    {
                                        const alreadyExist = new Error("Probation Form Already Exists for this user");
                                        alreadyExist.statusCode = 409;
                                        throw alreadyExist;
                                    }
                                } 
                                else {
                                    if (req.body.commonQuestions) {
                                        let commonLength = req.body.dynamicQuestions.length
                                        for (let i = 0; i < commonLength; i++) {
                                            if (req.body.commonQuestions[i].overAllEvaluation || req.body.commonQuestions[i].performance) {
                                                throw new Error ("You cannot Provide Values for the Questions")
                                            }
                                        }
                                    }
                                    if (req.body.dynamicQuestions) {
                                        let dynamicLength = req.body.dynamicQuestions.length;
                                        for (let i = 0; i < dynamicLength; i++) {
                                            if (req.body.dynamicQuestions[i].overAllEval || req.body.dynamicQuestions[i].performance) {
                                                throw new Error ("You cannot Provide Values for the Questions")
                                            }
                                        }
                                    }
                                    createNew(req, res, next, ProbationEvaluationModel);
                                }
                            })
                            .catch((error) => {
                                handleCatch(error, res, error.statusCode || 400, next)
                            })

                    })
                    .catch((error) => {
                        handleCatch(error, res, 404, next)
                    })

            })
            .catch((error) => {
                handleCatch(error, res, 404, next)
            })

    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
};

// Get Evaluation based on user ID
export const getProbationEvaluationsByUserId = (req, res, next) => {
    ProbationEvaluationModel.find({ user: req.params.id })
        .then((probationEvaluations) => {
            if (probationEvaluations.length === 0) throw new Error ("No Probation Evaluation Forms found")
            res.status(200).json({
                success: true,
                probationEvaluations
            });
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        });
};

export const getProbationEvaluationById = (req, res, next) => {
    getById(req.params.id, res, next, ProbationEvaluationModel, "ProbationEvaluation")
};

// UPDATE 
export const updateProbationEvaluationAdmin = (req, res, next) => {
    try {
        if (req.body.createAt || req.body.organization || req.body.user) throw new Error ("You can not change the Organization, User or Created At")
        ProbationEvaluationModel.findById(req.params.id)
            .then((probationEval) => {
                if (!probationEval) throw new Error ("Probation Evaluation Not Found");

                if (req.body.commonQuestions) {
                    let commonLength = req.body.dynamicQuestions.length
                    for (let i = 0; i < commonLength; i++) {
                        if (req.body.commonQuestions[i].overAllEvaluation || req.body.commonQuestions[i].performance) {
                            throw new Error ("You cannot Provide Values for the Questions")
                        }
                    }
                    probationEval.commonQuestions.push(...req.body.commonQuestions);
                }
                if (req.body.dynamicQuestions) {
                    let dynamicLength = req.body.dynamicQuestions.length;
                    for (let i = 0; i < dynamicLength; i++) {
                        if (req.body.dynamicQuestions[i].overAllEval || req.body.dynamicQuestions[i].performance) {
                            throw new Error ("You cannot Provide Values for the Questions")
                        }
                    }
                    probationEval.dynamicQuestions.push(...req.body.dynamicQuestions);
                }

                // Save updated document
                probationEval.save()
                    .then((updatedProbationEval) => {
                        res.status(200).json({
                            success: true,
                            message: "Questions successfully appended",
                            updatedProbationEval
                        });
                    })
                    .catch((error) => {
                        handleCatch(error, res, 404, next);
                    });

            })
            .catch((error) => {
                handleCatch(error, res, 404, next);

            });
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
};

export const updateProbationEvaluation = (req, res, next) => {
    try {
        if (req.body.createAt || req.body.organization || req.body.user) throw new Error ("You can not change the Organization, User or Created At")
        updateById(req, res, next, ProbationEvaluationModel, 'Probation Evaluation')
    }
    catch (error) {
        handleCatch(error, res, 404, next)
    }
};

// DELETE by Id
export const deleteProbationEvaluation = (req, res, next) => {
    deleteById(req.params.id, res, next, ProbationEvaluationModel, "ProbationEvaluation")
};
