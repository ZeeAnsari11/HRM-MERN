import { qualificationExperiencesModel } from "../models/qualificationExperiences.js"
import { createNew, deleteById, getById, updateById } from "../utils/common.js"

export const createQualification = (req, res, next) => {
    createNew(req, res, next, qualificationExperiencesModel)
}

export const getQualificationById = (req, res, next) => {
    getById(req.params.id, res, next, qualificationExperiencesModel)
}

export const deleteQualificationById = (req, res, next) => {
    deleteById(req.params.id, res, next, qualificationExperiencesModel);
}

export const updateQualificationById = (req, res, next) => {
    updateById(req, res, next, qualificationExperiencesModel)
}