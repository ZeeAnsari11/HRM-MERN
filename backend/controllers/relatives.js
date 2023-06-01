import { RelativeModel } from "../models/relativeSchema.js";
import { createNew, deleteById, getAll, updateById, handleCatch } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";

export const createRelative = (req, res, next) => {
    UserModel.findById(req.body.user)
        .then((user) => {
            if (!user) throw new Error ("user does not exists.");
            createNew(req, res, next, RelativeModel);
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const getAllRelativesByUserId = (req, res, next) => {
    getAll(res, next, RelativeModel,{user:req.params.id},"Relative")
}

export const updateRelative = (req, res, next) => {
    try {
        if (req.body.user) throw new Error ("Can't update user of a relative.")
        updateById(req, res, next, RelativeModel);
    }
    catch (error) {
        handleCatch(error, res, 403, next)
    }
}

export const deleteRelativeByUserId = (req, res, next) => {
    RelativeModel.deleteMany({user:req.params.id})
    .then((response) => {
        if (!response.deletedCount) throw new Error ("No relative exists for this user!")
        res.status(200).json({
            success: true,
            message: "Relatives deleted successfully!"
        })
    })
    .catch((error) => {
        handleCatch(error, res, 404, next)
    })
}

export const deleteRelativeById = (req, res, next) => {
    deleteById(req.params.id, res, next, RelativeModel, "Relative")
}