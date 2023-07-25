import { assetType } from "./configuration";
import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createAssetType = (formData, changeToggler, trigger) => {
    axios.post(assetType.createAssetType, formData)
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

export const getAssetTypesByOrgId = (orgId, setAssetTypes) => {
    axios.get(assetType.getAssetType + orgId)
        .then((response) => {
            console.log(response);
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
    })
    .catch((err) => { 
        toastMessage("error", err.response.data.Message, toast) 
    })
}

export const updateAssetType = (id, data, trigger) => {
    axios.put(assetType.deleteAssetType+id, data)
    .then((response) => {
        toastMessage("success", response.data.Message, toast)
    })
    .catch((err) => { 
        toastMessage("error", err.response.data.Message, toast) 
    })
    .finally(() => {
        trigger();
    })
}