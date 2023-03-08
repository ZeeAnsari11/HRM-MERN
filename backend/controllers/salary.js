import { checkIsExistAndCreate, getAll, updateById } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { SalaryModel } from "../models/salary.js";

export const createSalary = (req, res, next) => {
    checkIsExistAndCreate(req, res, next, req.body.user, UserModel, SalaryModel, 'Salary');
}

export const getAllsalariesByUserID = (req, res, next) => {
    getAll(res, next, SalaryModel, { user: req.params.id }, 'Salary');
}

export const updateSalary = (req, res, next) => {
    try {
        if (req.body.user) throw "Can not assign pre-asigned salary to another user."
        updateById(req, res, next, SalaryModel);
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error
        })
    }
}