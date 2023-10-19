import axios from "axios";
import { organizationRoutes } from "./configuration";
import { setHeaders } from "../utils/AdminStatus";
import { taxRuleRoute } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createTaxRule = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'creatingTaxRule')

    axios.post(taxRuleRoute.createTaxRule, formData, {headers})
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

export const getTaxRulesByOrgId = (orgId, setTaxRules, role) => {
    const headers = setHeaders(orgId, role, 'getTaxRuleByOrganizationId')
    axios.get(organizationRoutes.getTaxRulesByOrgId + orgId, {headers})
        .then((response) => {
            setTaxRules(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteTaxRulesById = (id, orgId, role) => {
    const headers = setHeaders(orgId, role, 'deleteTaxRuleById')

    axios.delete(taxRuleRoute.deleteTaxRuleById + id , {headers})
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

export const updateTaxRulesById = (id, formData, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'updateTaxRuleById')

    axios.put(taxRuleRoute.updateTaxRuleById + id, formData, {headers})
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