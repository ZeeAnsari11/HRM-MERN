import { BranchSchema } from "../models/branchSchema.js"

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

export const loadBranchCollection = (req, res, next) => {
    BranchSchema.find()
    .then((response) => {
        res.status(200).json({
            success: true,
            branches: response
        })
    })  
    .catch((error) => {
        console.log(error)
    })
}