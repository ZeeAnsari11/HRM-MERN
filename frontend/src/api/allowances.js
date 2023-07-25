import { allowances } from "./configuration";
import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

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

export const deletAllowanceById = (id) => {
    axios.delete(allowances.deletAllowancesById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/allowances"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateAllowanceById = (id, formData, trigger) => {
    axios.put(allowances.updateAllowancesById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/allowances"
            }, 2000)
            trigger();
        })
}
