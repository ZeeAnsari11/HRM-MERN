import axios from "axios";
import { loanType } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createLoanType = (formData, changeToggler, trigger) => {
    axios.post(loanType.createLoanType, formData)
        .then(() => {
            toastMessage("success", "Loan Type created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getLoanTypesByOrgId = (orgId, setAssetTypes) => {
    axios.get(loanType.getAllowancesByOrgId + orgId)
        .then((response) => {
            setAssetTypes(response.data.response);
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteLoanType = (id) => {
    axios.delete(loanType.deleteLoanTypeById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
             //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/loan-type"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateLoanTypeById = (id, formData, trigger) => {
    axios.put(loanType.updateLoanTypeById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}
