import { allowances } from "./configuration";
import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createAllowance = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createAllowance')

    axios.post(allowances.createAllowance, formData, {headers})
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

export const getAllowancesByOrgId = (orgId, setAssetTypes, trigger = null, role) => {
    const headers = setHeaders(orgId, role, 'getAllAllowanceByOrganization')
    axios.get(allowances.getAllowancesByOrgId + orgId, {headers})
        .then((response) => {
            setAssetTypes(response.data.response)
            if(trigger !== null){
                trigger()
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deletAllowanceById = (id, orgId, role) => {
const headers = setHeaders(orgId, role, 'deleteAllowanceById')

    axios.delete(allowances.deletAllowancesById + id, {headers})
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

export const updateAllowanceById = (id, formData, trigger, orgId, role) => {
const headers = setHeaders(orgId, role, 'updateAllowanceById')

    axios.put(allowances.updateAllowancesById + id, formData, {headers})
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
