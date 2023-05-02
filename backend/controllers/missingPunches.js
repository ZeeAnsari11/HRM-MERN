import { createNew, handleCatch, getById, deleteById, updateById } from "../utils/common.js"
import { MissingPunchesModel } from "../models/missingPunchesSchema.js"

export const createMissingPunchRequest = (req, res, next) => {
    try {
        if (req.body.status) throw "Status is not required"
        
        createNew(req, res, next, MissingPunchesModel)
    }
    catch (err) { handleCatch(err, res, 401, next) }

}

export const getMissingPunchRequest = (req, res, next) => {
    getById(req.params.id, res, next, MissingPunchesModel, "Punch Type")
}

export const deleteMissingPunchRequest = (req, res, next) => {
    MissingPunchesModel.findById(req.params.id)
        .then((punch) => {
            if (punch.status !== "pending") {
                deleteById(req.params.id, res, next, MissingPunchesModel)
            }
            else throw "Your request for missing punch is approved / rejected so can not delete it now"
        })
        .catch(err => handleCatch(err, res, 401, next))
}

export const updateMissingPunchRequest = (req, res, next) => {
    MissingPunchesModel.findById(req.params.id)
        .then((punch) => {
            if (punch.status !== "pending") {
                updateById(req.params.id, res, next, MissingPunchesModel)
            }
            else throw "Your request for missing punch is approved / rejected so can not update it now"
        })
        .catch(err => handleCatch(err, res, 401, next))
}