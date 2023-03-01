import { createNew, deleteById, deleteInBulk, getAll, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { CertificateModel } from "../models/certificateSchema.js";

export const createCertification = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw "user does not exists.";
            createNew(req, res, next, CertificateModel);
        })
        .catch((error) => {
            res.status(401).json({
                success: false,
                error: error
            })
        })
}

export const getAllCertificationByUserID = (req, res, next) => {
    getAll(res,next, CertificateModel, { user: req.params.id }, 'Certifications');
}

export const updateCertification = (req, res, next) => {
    try {
        if (req.body.user) throw "Can not assign certification to another user."
        updateById(req, res, next, CertificateModel);
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        })
    }
}

export const deleteAllCertifications = (req, res, next) => {
    const query = { user:req.params.id };
    deleteInBulk(res, next, CertificateModel, query, "Certification");
}

export const deleteCertificationById = (req, res, next) => {
    deleteById(req.params.id,res,next,CertificateModel,"Certification");
}