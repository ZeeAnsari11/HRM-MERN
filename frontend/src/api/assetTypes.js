import { assetType } from "./configuration";
import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createAssetType = (formData, changeToggler, trigger, orgId, role ) => {
    const headers = setHeaders(orgId, role, 'createAssetType')

    axios.post(assetType.createAssetType, formData, {headers})
        .then(() => {
            toastMessage("success", "Asset Type created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(()=>{
            trigger()
        })
}

export const getAssetTypesByOrgId = (orgId, setAssetTypes,role) => {
    const headers = setHeaders(orgId, role, 'getAllAssetTypeByOrgId')
    axios.get(assetType.getAssetType + orgId, {headers})
        .then((response) => {
            setAssetTypes(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteAssetType = (id) => {
    axios.delete(assetType.deleteAssetType+id)
    .then((response) => {
        toastMessage("success", response.data.Message, toast) 
        setTimeout(() => {
            window.location.href = "/dashboard/asset-type"
        }, 2000)
    })
    .catch((err) => { 
        toastMessage("error", err.response.data.Message, toast) 
    })
}

export const updateAssetType = (id, data, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'UpdateAssetTypeById')

    axios.put(assetType.UpdateAssetType+id, data, {headers})
    .then((response) => {
        toastMessage("success", response.data.Message, toast)
        setTimeout(() => {
            window.location.href = "/dashboard/asset-type"
        }, 2000)
    })
    .catch((err) => { 
        toastMessage("error", err.response.data.Message, toast) 
    })
    .finally(() => {
        trigger();
    })
}