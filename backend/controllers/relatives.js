import { RelativeModel } from "../models/relativeSchema";
import { createNew, deleteById, updateById } from "../utils/common";

export const createRelative = (req, res, next) => {
    createNew(req, res, next, RelativeModel);
}

export const getAllRelativesByEmployeeID = (req, res, next) => {
    RelativeModel.find({employee: req.params.id})
    .then((response) => {
        res.status(200).json({
            success: true,
            relatives: response
        })
    }) 
    .catch((error) => console.log(error))
}

export const updateRelative = (req, res, next) => {
    updateById(req, res, next, RelativeModel);
}

export const deleteRelative = (req, res, next) => {
    deleteById(req, res, next, RelativeModel);
}