import { BranchModel } from "../models/branchSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"
import { createNew, getById, deleteById as DeleteByID, getAll, updateById, handleCatch } from "../utils/common.js"


export const createBranch = (req, res, next) => {
    try {
        if (req.body.unique_id) throw "unique_id is not required in body"
        OrganizationModel.findById(req.body.organization)
            .then((organization) => {
                if (!organization) throw "Organization not found"
                req.body.unique_id = req.body.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                createNew(req, res, next, BranchModel);
            })
    }
    catch (err) { handleCatch(err, res, 401, next) }
}

export const getBranchById = (req, res, next) => {
    getById(req.params.id, res, next, BranchModel)
}

export const loadBranchCollection = (req, res, next) => {
    getAll(res, next, BranchModel, {}, "Branches")
}

export const deleteById = (req, res, next) => {
    DeleteByID(req.params.id, res, next, BranchModel);
}

export const getBranchesByOrganization = (req, res, next) => {
    BranchModel.find({ organization: req.params.id })
        .then((response) => {
            res.status(200).json({
                success: true,
                branches: response
            })
        })
        .catch((error) => handleCatch(error, res, 401, next))
}

export const updateBranch = (req, res, next) => {
    try {
        if (req.body.organization || req.body.unique_id) throw "You can not update organization, Id of AssetType"
        if (req.body.name) {
            BranchModel.findById(req.params.id)
                .then((branch) => {
                    if (!branch) throw "AssetType Not Found"
                    req.body.unique_id = branch.organization + req.body.name?.replace(/\s/g, "").toLowerCase()
                    updateById(req, res, next, BranchModel, "Branch Details")
                })
                .catch((err) => { handleCatch(err, res, 401, next)})
        }
        else {
            updateById(req, res, next, DesignationModel, "Designation Details")
        }
    }
    catch (err) { handleCatch(err, res, 401, next)}
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
        .catch((e) => console.log(e))
    })
}