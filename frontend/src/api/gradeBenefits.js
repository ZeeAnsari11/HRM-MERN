import { gradeBenefits, loanType, organizationRoutes } from "./configuration";

import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createGradeBenefit = (formData, changeToggler, trigger) => {
    axios.post(gradeBenefits.createGradeBenefit, formData)
        .then(() => {
            toastMessage("success", "GradeBenefit created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getgradeBenefitsByOrgId = (orgId, setAssetTypes, trigger = null) => {
    axios.get(organizationRoutes.getGradeBenefitsByOrgId + orgId)
        .then((response) => {
            setAssetTypes(response.data.response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() =>{
            if(trigger !== null){
                trigger()
            }
        })
}

export const deleteGradeBenefitsById = (id) => {
    axios.delete(gradeBenefits.deleteGradeBenefitById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
             //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/grade-benefits"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateGradeBenefitsById = (id, formData, trigger) => {
    axios.put(gradeBenefits.updateGradeBenefitById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            setTimeout(() => {
                window.location.href = "/dashboard/grade-benefits"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}
