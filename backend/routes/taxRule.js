import express from "express";
import {
    creatingTaxRule, updateTaxRuleById, deleteTaxRuleById, getTaxRuleId
} from '../controllers/taxRule.js'

export const taxRuleRoute = express.Router();

taxRuleRoute.route('/taxRule/new').post(creatingTaxRule)
taxRuleRoute.route('/taxRule/update/:id').put(updateTaxRuleById)
taxRuleRoute.route('/taxRule/delete/:id').delete(deleteTaxRuleById)
taxRuleRoute.route('/taxRule/:id').get(getTaxRuleId)