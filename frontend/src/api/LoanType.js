import axios from "axios";
import { loanType } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const createLoanType = (formData, changeToggler, trigger) => {
    axios.post(loanType.createLoanType, formData)
        .then(() => {
            toastMessage("success", "Asset Type created successfully,", toast);
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
            setAssetTypes(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}
