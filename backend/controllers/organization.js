import { OrganizationModel } from '../models/organizationSchema.js';
import { createNew, getAll, getById, deleteById, updateById } from '../utils/common.js';

export const createOrganization = (req, res, next) => {
    createNew(req, res, next,OrganizationModel)
}

export const getAllOrganizations = (req, res, next) => {
    getAll(req,res,next, OrganizationModel)
}

export const getOrganizationById = (req, res, next) => {
    getById(req,res,next, OrganizationModel)
}


export const deleteOrganizationById = (req, res, next) => {
    deleteById(req,res,next, OrganizationModel)
}

export const updateOrganizationById = (req, res, next)=>{
    updateById(req,res,next, OrganizationModel)
}