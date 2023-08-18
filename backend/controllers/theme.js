import { createNew, handleCatch, updateById } from "../utils/common.js";

import { OrganizationModel } from "../models/organizationSchema.js"
import { ThemeModel } from "../models/themeSchema.js";

export const createThemeConfiguration = (req, res, next) => {
    OrganizationModel.findById(req.body.organization)
        .then((organization) => {
            if (!organization) throw new Error("Organization not found")
            createNew(req, res, next, ThemeModel);
        })
        .catch((error) => {
            handleCatch(error, res, 404, next)
        })
}

export const updateThemeConfiguration = (req, res, next) => {
    try {
        if (req.body.organization) throw new Error("Can't update the organization.")
        ThemeModel.findOneAndUpdate({ organization: req.params.id }, req.body, { new: true, runValidators: true })
            .then((updatedDocument) => {
                if (!updatedDocument) {
                    throw new Error(`Theme Not Found`);
                }
                res.status(200).json({
                    success: true,
                    Message: `Theme Updated Successfully`
                });
            })
            .catch((error) => {
                handleCatch(error, res, 500, next);
            });
    }
    catch (error) {
        handleCatch(error, res, 403, next)
    }
}

export const deleteThemeConfiguration = (req, res, next) => {
    ThemeModel.findOneAndDelete({ organization: req.params.id })
        .then(() => {
            res.status(200).json({
                success: true,
                Message: 'Theme configuration deleted Successfully'
            })
        })
        .catch((error) => {
            handleCatch(error, res, 500, next)
        })
}

export const getThemeConfiguration = (req, res, next) => {
    ThemeModel.find({ organization: req.params.id })
        .then((theme) => {
            res.status(200).json({
                success: true,
                response: theme[0]
            })
        })
        .catch((error) => {
            handleCatch(error, res, 500, next)
        })
}