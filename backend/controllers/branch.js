import { BranchModel } from "../models/branchSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"
import { createNew, getById, deleteById as DeleteByID, getAll, updateById } from "../utils/common.js"


export const createBranch = (req, res, next) => {
    createNew(req, res, next,BranchModel)
}

export const getBranchById = (req, res, next) => {
    getById(req.params.id, res, next,BranchModel)
}

export const loadBranchCollection = (req, res, next) => {
    getAll(req, res, next,BranchModel)
}

export const deleteById = (req, res, next) => {
    DeleteByID(req.params.id, res, next,BranchModel);
}

export const getBranchesByOrganization = (req, res, next) => {
    BranchModel.find({organization: req.params.id})
    .then((response) => {
        res.status(200).json({
            success: true,
            branches: response
        })
    })
    .catch((error) => {
        res.status(401).json({
            success: false,
            error: error
        })
    })
}

export const updateBranch = (req, res, next) => {
    updateById(req, res, next, BranchModel)
}

export const getOrganizationByBranchId = (req, res, next) => {
    BranchModel.findById(req.params.id)
    .then((response) => {
        OrganizationModel.findById(response.organization)
        .then((organization) => {ß
            res.status(200).json({
                success: true,
                organization: organization
            })
        })
        .catch((e) => {throw e})
    })
    .catch((e) => console.log(e))
}