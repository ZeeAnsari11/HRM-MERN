import { PaySlipModel } from "../models/payslipSchema.js";
import { UserModel } from "../models/userSchema.js"
import { AllowanceModel } from "../models/allowanceSchema.js";
import { createNew, handleCatch } from "../utils/common.js"

export const createPaySlip = (req, res, next) => {
    try {
        UserModel.findById(req.body.user)
            .then((user) => {
                if (!user) throw 'No such user'
                req.body.finalSalary = req.body.basicSalary = user.baseSalary
                req.body.allowance = {
                    allowanceDetails: []
                }
                AllowanceModel.find()
                    .then((allowances) => {
                        if (allowances.length == 0) {
                            createNew(req, res, next, PaySlipModel)
                        }
                        else {
                            allowances.forEach(allowance => {
                                let x = {
                                    name: allowance.allowanceName,
                                    amount: user.baseSalary * (allowance.percrentageOfBaseSalary / 100)
                                }
                                req.body.finalSalary = req.body.finalSalary + (user.baseSalary * (allowance.percrentageOfBaseSalary / 100))
                                req.body.allowance.allowanceDetails.push(x)
                            })
                            createNew(req, res, next, PaySlipModel)
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