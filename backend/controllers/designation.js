import { createNew, deleteById, deleteInBulk, getAll, getById, handleCatch, updateById } from "../utils/common.js"

import { DesignationModel } from "../models/designationSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";

export const createDesignation = (req, res, next) => {
    try{
        if(req.body.unique_id) throw new Error ("unique_id is not required in body")
        OrganizationModel.findById(req.body.organization)
        .then((response) => {
            if (!response) throw new Error ("Organization Not Found")
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
        if (req.body.organization  || req.body.unique_id) throw new Error ("You can not update organization of Designation")
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

// export const getDesignationsBycreatorId = (req, res, next)=>{
//     getAll(res, next, DesignationModel, {createdBy : req.params.id}, "Designation");
// }
export const deleteDesiginationById= (req, res, next) => {
    deleteById(req.params.id, res, next, DesignationModel, "Desigination")
}

export const getAllDesignationsByOrgId = (req, res, next)=>{
    getAll(res, next, DesignationModel, {organization : req.params.id}, "Designation");
}

export const deleteAllDesignationsByOrgId = (req, res, next)=>{
    deleteInBulk(res, next, DesignationModel, {organization : req.params.id}, "Designation")
}


