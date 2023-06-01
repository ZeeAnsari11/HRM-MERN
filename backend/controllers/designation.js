import { DesignationModel } from "../models/designationSchema.js";
import { UserModel } from "../models/userSchema.js";
import { createNew, updateById, getAll, getById, deleteInBulk, handleCatch } from "../utils/common.js"

export const createDesignation = (req, res, next) => {
    try{
        if(req.body.unique_id) throw new Error ("unique_id is not required in body")
        UserModel.find({ _id: req.body.createdBy, organization: req.body.organization })
        .then((response) => {
            if (response.length == 0) throw new Error ("User and Organization not belong to each other")
            req.body.unique_id = req.body.organization + req.body.shortForm;
            createNew(req, res, next, DesignationModel)
        })
        .catch((err) => {
            handleCatch(err, res, 404, next)
        })
    }
    catch(err){handleCatch(err, res, 404, next)}
   
}

export const updateDesignationById = (req, res, next) => {
    try {
        if (req.body.organization || req.body.createdBy || req.body.unique_id) throw new Error ("You can not update organization, Creater of Designation")
        if (req.body.shortForm) {
            DesignationModel.findById(req.params.id)
                .then((designatin) => {
                    if (!designatin) throw new Error ("Designation Not Found")
                    req.body.unique_id =( designatin.organization + req.body.shortForm).toLowerCase();
                    updateById(req, res, next, DesignationModel, "Designation Details")
                })
                .catch((err) => handleCatch(err, res, 404, next))
        }
        else {
            updateById(req, res, next, DesignationModel, "Designation Details")
        }
    }
    catch (err) { handleCatch(err, res, 422, next)}
}

export const getDesignationById = (req, res, next) => {
    getById(req.params.id, res, next, DesignationModel, 'Designation');
}

export const getDesignationsBycreatorId = (req, res, next)=>{
    getAll(res, next, DesignationModel, {createdBy : req.params.id}, "Designation");
}

export const getAllDesignationsByOrgId = (req, res, next)=>{
    getAll(res, next, DesignationModel, {organization : req.params.id}, "Designation");
}

export const deleteAllDesignationsByOrgId = (req, res, next)=>{
    deleteInBulk(res, next, DesignationModel, {organization : req.params.id}, "Designation")
}


