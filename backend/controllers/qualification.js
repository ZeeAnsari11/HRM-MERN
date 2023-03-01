import { createNew, deleteById, getAll, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { QualificationModel } from "../models/qualificationSchema.js";

export const createQualification = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw "user does not exists.";
            createNew(req, res, next, QualificationModel);
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}

export const getAllQualificationsByUserID = (req, res, next) => {
    getAll(res,next, QualificationModel, { user: req.params.id }, 'Qualifications');
}

export const updateQualification = (req, res, next) => {
    try {
        if (req.body.user) throw "Can not assign qualification to another user."
        updateById(req, res, next, QualificationModel);
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        })
    }
}

export const deleteAllQualifications = (req, res, next) => {
    QualificationModel.deleteMany({user:req.params.id})
    .then((response) => {
        if (!response) throw "user does not exists!"
        res.status(200).json({
            success: true,
            message: "Qualifications deleted successfully!"
        })
    })
    .catch((error) => {
        res.status(404).json({
            success: false,
            error: error
        })
    })
}

export const deleteQualificationById = (req, res, next) => {
    deleteById(req.params.id,res,next,QualificationModel,"Qualification");
}