import { BranchSchema } from "../models/branchSchema.js"
import { OrganizationModel } from "../models/organizationSchema.js"

export const createBranch = (req, res, next) => {
    BranchSchema.create(req.body)
    .then((response)=>{
        res.status(201).json({
            success: true,
            response
        })
    })
    .catch((error) => {
        res.status(401).json({
            success: false,
            error: error
        })
    })
}

export const getBranchById = (req, res, next) => {
    BranchSchema.findById(req.params.id)
    .then((response)=>{
        if (!response) {
            throw ("Branch Not Found");
        }
        else {
            res.status(200).json({
                success: true,
                branch: response
            })
        }
    })
    .catch((error) => {
        res.status(401).json({
            success: false,
            error: error
        })
    })
}

export const loadBranchCollection = (req, res, next) => {
    BranchSchema.find()
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

export const deleteById = (req, res, next) => {
    BranchSchema.findByIdAndDelete(req.params.id)
    .then(() => {
        res.status(200).json({
            success: true,
            message: "branch deleted successfully"
        })
    })
    .catch((error) => {
        res.status(401).json({
            success: false,
            error: error
        })
    })
}

export const getBranchesByOrganization = (req, res, next) => {
    BranchSchema.find({organization: req.params.id})
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
    try {
        if (!req.body) throw "Already Up to date!";
        BranchSchema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        .then((response) => {
            res.status(200).json({
                success: true,
                response
            })
        })
        .catch((error) => console.log(error))
    }
    catch (error) {
        console.log(error);
    }
}

export const getOrganizationByBranchId = (req, res, next) => {
    BranchSchema.findById(req.params.id)
    .then((response) => {
        OrganizationModel.findById(response.organization)
        .then((organization) => {
            res.status(200).json({
                success: true,
                organization: organization
            })
        })
        .catch((e) => {throw e})
    })
    .catch((e) => console.log(e))
}