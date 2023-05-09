import { getAll, createNew, handleCatch } from "../utils/common.js";
import { UserModel } from "../models/userSchema.js";
import { SalaryModel } from "../models/salarySchema.js";

export const getAllSalariesByUserID = (req, res, next) => {
    getAll(res, next, SalaryModel, { user: req.params.id }, 'Salary');
}

export const updateSalary = (req, res, next) => {
    try {
        if (req.body.user || req.body.previousSalary || !req.body.currentSalary) throw 'Invalid Body.'
        UserModel.findById(req.params.id)
            .then((user) => {
                if (!user) throw 'No Such User.'
                SalaryModel.find({ user: req.params.id })
                    .then((userSalaries) => {
                        if (userSalaries.length == 0) {
                            if (req.body.currentSalary > user.grossSalary) {
                                req.body.user = req.params.id;
                                req.body.previousSalary = user.grossSalary;
                                createNew(req, res, next, SalaryModel)
                            } else throw 'Invalid salary.'
                        } else {
                            userSalaries.forEach(userSalary => {
                                req.body.previousSalary = userSalary.currentSalary
                            })
                            if (req.body.previousSalary < req.body.currentSalary) {
                                req.body.user = req.params.id;
                                createNew(req, res, next, SalaryModel)
                            }
                            else throw 'same as previous curernt salary.'
                        }
                    })
                    .catch((error) => {
                        handleCatch(error, res, 401, next)
                    })
            })
            .catch((error) => {
                handleCatch(error, res, 401, next)
            })
    }
    catch (error) {
        handleCatch(error, res, 401, next)
    }
}