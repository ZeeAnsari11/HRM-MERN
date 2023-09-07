import {
    creatingTaxRule,
    deleteTaxRuleById,
    getTaxRuleByOrganizationId,
    getTaxRuleId,
    updateTaxRuleById
} from '../controllers/taxRule.js'

import express from "express";

export const taxRuleRoute = express.Router();

taxRuleRoute.route('/taxRule/new').post(creatingTaxRule)
taxRuleRoute.route('/taxRule/:id').put(updateTaxRuleById).delete(deleteTaxRuleById).get(getTaxRuleId)
taxRuleRoute.route('/taxRule/organization/:id').get(getTaxRuleByOrganizationId)
