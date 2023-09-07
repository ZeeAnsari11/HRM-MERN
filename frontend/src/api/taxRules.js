import axios from "axios";
import { organizationRoutes } from "./configuration";
import { taxRuleRoute } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createTaxRule = (formData, changeToggler, trigger) => {
    axios.post(taxRuleRoute.createTaxRule, formData)
        .then(() => {
            toastMessage("success", "Branch created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getTaxRulesByOrgId = (orgId, setTaxRules) => {
    axios.get(organizationRoutes.getTaxRulesByOrgId + orgId)
        .then((response) => {
            setTaxRules(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteTaxRulesById = (id) => {
    axios.delete(taxRuleRoute.deleteTaxRuleById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/tax-rules"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateTaxRulesById = (id, formData, trigger) => {
    axios.put(taxRuleRoute.updateTaxRuleById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/tax-rules"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}