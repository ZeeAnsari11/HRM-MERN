import { TaxRuleModel } from "../models/taxRuleSchema.js";
import { createNew, handleCatch, updateById, getById, deleteById } from '../utils/common.js'

export const creatingTaxRule = (req, res, next) => {
    try {
        if (!req.body.ruleNo) throw new Error ("Invalid Body.")
        TaxRuleModel.find({ ruleNo: req.body.ruleNo })
            .then((ruleNo) => {
                if(ruleNo.length == 0){
                    if (!req.body.fixRate) {
                        req.body.fixRate = 0
                    }
                    createNew(req, res, next, TaxRuleModel)
                }
                else throw new Error ("Rule no. already exists.")
            })
            .catch((error) => {
                handleCatch(error, res, 409, next)
            })
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const updateTaxRuleById = (req, res, next) => {
    try {
        if (Object.keys(req.body).length == 0) throw new Error ("Request Body is empty.")
        if (req.body.organization || req.body.unique_id || req.body.createdAt) throw new Error ("Invalid Body.")
        if (req.body.fromAmount || req.body.toAmount) {
            TaxRuleModel.findById(req.params.id)
                .then((response) => {
                    if (!response) throw new Error ('No Such TaxRuleModel')
                    req.body.unique_id = response.organization + req.body.fromAmount ? req.body.fromAmount : response.fromAmount + req.body.toAmount ? req.body.toAmount : response.toAmount
                    updateById(req, res, next, TaxRuleModel, 'taxRuleModel')
                })
                .catch((error) => {
                    handleCatch(error, res, 404, next)
                })
        } else updateById(req, res, next, EOETypeModel, 'eoeType')
    } catch (error) {
        handleCatch(error, res, 400, next)
    }
}

export const deleteTaxRuleById = (req, res, next) => {
    deleteById(req.params.id, res, next, TaxRuleModel, 'TaxRuleModel')
}

export const getTaxRuleId = (req, res, next) => {
    getById(req.params.id, res, next, TaxRuleModel, 'TaxRuleModel')
}
