import { createNew, deleteById, getAll, handleCatch, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { QualificationModel } from "../models/qualificationSchema.js";

export const createQualification = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw new Error ("user does not exists.");
            createNew(req, res, next, QualificationModel);
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const getAllQualificationsByUserID = (req, res, next) => {
    getAll(res,next, QualificationModel, { user: req.params.id }, 'Qualifications');
}

export const updateQualification = (req, res, next) => {
    try {
        if (req.body.user) throw new Error ("Can not assign qualification to another user.")
        updateById(req, res, next, QualificationModel);
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const deleteAllQualifications = (req, res, next) => {
    QualificationModel.deleteMany({user:req.params.id})
    .then((response) => {
        if (!response) throw new Error ("user does not exists!")
        res.status(200).json({
            success: true,
            message: "Qualifications deleted successfully!"
        })
    })
    .catch((error) => {
        handleCatch(error, res, 404, next)
    })
}

export const deleteQualificationById = (req, res, next) => {
    deleteById(req.params.id,res,next,QualificationModel,"Qualification");
}