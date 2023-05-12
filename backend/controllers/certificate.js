import { createNew, deleteById, deleteInBulk, getAll, handleCatch, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { CertificateModel } from "../models/certificateSchema.js";

export const createCertification = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw "user does not exists.";
            createNew(req, res, next, CertificateModel);
        })
        .catch(err => handleCatch(err, res, 401, next))
}

export const getAllCertificationByUserID = (req, res, next) => {
    getAll(res, next, CertificateModel, { user: req.params.id }, 'Certifications');
}

export const updateCertification = (req, res, next) => {
    try {
        if (req.body.user) throw "Can not assign certification to another user."
        updateById(req, res, next, CertificateModel);
    }
    catch (error) { handleCatch(error, res, 401, next) }
}

export const deleteAllCertifications = (req, res, next) => {
    const query = { user: req.params.id };
    deleteInBulk(res, next, CertificateModel, query, "Certification");
}

export const deleteCertificationById = (req, res, next) => {
    deleteById(req.params.id, res, next, CertificateModel, "Certification");
}