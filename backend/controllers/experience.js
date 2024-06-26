import { ExperienceModel } from "../models/experienceSchema.js";
import { createNew, deleteById, getAll, handleCatch, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";

export const createExperience = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw new Error ("user does not exists.");
            createNew(req, res, next, ExperienceModel);
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const getAllExperiencesByUserID = (req, res, next) => {
    const query = { user:req.params.id };
    getAll(res, next, ExperienceModel, query, "Experience");
}

export const updateExperiences = (req, res, next) => {
    try {
        if (req.body.user) throw new Error ("Can not assign experience to another user.")
        updateById(req, res, next, ExperienceModel, 'Experience');
    }
    catch (error) { handleCatch(error, res, 404, next)}
}

export const deleteExperiences = (req, res, next) => {
    ExperienceModel.deleteMany({user:req.params.id})
    .then((response) => {
        if (!response.deletedCount) throw new Error ("user does not exists!")
        res.status(200).json({
            success: true,
            message: "Experience deleted successfully!"
        })
    })
    .catch((error) => { handleCatch(error, res, 404, next) })
}

export const deleteExperienceById = (req, res, next) => {
    deleteById(req.params.id, res, next, ExperienceModel, "Experience")
}