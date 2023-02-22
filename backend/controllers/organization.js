import { OrganizationModel } from '../models/organizationSchema.js';
import { createNew, getAll, getById, deleteById, updateById } from '../utils/common.js';

export const createOrganization = (req, res, next) => {
    createNew(req, res, next,OrganizationModel)
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

export const updateOrganizationById = (req, res, next)=>{
    updateById(req, res, next, OrganizationModel)
}