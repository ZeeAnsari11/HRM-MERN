import axios from "axios";
import { allowances } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const createAllowance = (formData, changeToggler, trigger) => {
    axios.post(allowances.createAllowance, formData)
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

export const getAllowancesByOrgId = (orgId, setAssetTypes) => {
    axios.get(allowances.getAllowancesByOrgId + orgId)
        .then((response) => {
            console.log(response);
            setAssetTypes(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}
