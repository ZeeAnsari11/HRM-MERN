import { OrganizationModel } from '../models/organizationSchema.js';
import { createNew, getAll, getById, deleteById, updateById, handleCatch } from '../utils/common.js';

export const createOrganization = (req, res, next) => {
    try {
        if (req.body.userCode?.currentCode >= 0) throw new Error ("Can't update current code")
        if (!req.body.restDays) { throw new Error ("Rest days are required and must be in between 1 and 7 ") }
        const restDays = [...new Set(req.body.restDays)];
        restDays.forEach(restDay => {
            if (restDay < 0 || restDay > 8) { throw new Error ("Rest days must be in between 1 and 7 ") }
        })
        createNew(req, res, next, OrganizationModel)
    }
    catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const getAllOrganizations = (req, res, next) => {
    getAll(res, next, OrganizationModel)
}

export const getOrganizationById = (req, res, next) => {
    let id = req.params.id;
    getById(id, res, next, OrganizationModel)
}


export const deleteOrganizationById = (req, res, next) => {
    let id = req.params.id;
    deleteById(id, res, next, OrganizationModel)
}

export const updateOrganizationById = (req, res, next) => {
    OrganizationModel.findById(req.params.id)
        .then((response) => {
            if (req.body.userCode.currentCode >= 0) throw new Error ("Can't update pre defined code.")
            if (!response) throw new Error (`Organization Not Found`)
            if (req.body.restDays) {
                const restDays = [...new Set(req.body.restDays)];
                restDays.forEach(restDay => {
                    if (restDay < 0 || restDay > 8) { throw new Error ("Rest days must be in between 1 and 7 " )}
                })
            }
            req.body.userCode.currentCode = response.userCode.currentCode;
            updateById(req, res, next, OrganizationModel, "Organization")
        })
        .catch((error) => {handleCatch(error, res, 400, next)})
}