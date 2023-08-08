import { allAssets, asset, assetManagment, assetType, getAsset, getAssetBy } from "./configuration";
import { setAllAssets, setAllocation, setAsset, setAssetHistory, setAssetTypes } from "../states/reducers/slices/backend/Assets";

import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const saveAssetFormData = (formData) => {
    axios.post(asset.setAsset, formData)
    .then(() => {
        toastMessage("success", "Asset created Successfully", toast);
    })
    .catch(() => {
        toastMessage("error", "Asset creation failed!", toast);
    })
}

export const getAssetTypesByOrganizationId = (organizationId, dispatcher) => {
    axios.get(assetType.getAssetType+organizationId)
    .then((response) => {
       dispatcher(setAssetTypes(response.data.response))
    })
    .catch((e) => {
        console.log(e)
    })
}

export const getAssetByOrganizationId = (organizationId, dispatcher) => {
    axios.get(allAssets.getAssets+organizationId)
    .then((response) => {
       dispatcher(setAllAssets(response.data.response))
    })
    .catch((e) => {
        console.log(e)
    })
}

export const AllocateDeallocateAsset = (formData, dispatcher, setShowLoading) => {
    axios.put(assetManagment.manageAsset, formData)
    .then((response) => {
       dispatcher(setAllocation(formData))
       console.log('=======response===',response);
       toastMessage("success", response.data.message, toast);
    })
    .catch((err) => {
        toastMessage("error", err.response.data.message, toast);
    })
    .finally(()=>{
        setShowLoading(false)
    })
}

export const getAssetHistoryById = (id , setHistory) => {
    axios.get(getAsset.byId + id)
    .then((response) => {
        console.log("Response", response);
        setHistory(response?.data?.data);
    })
    .catch(() => {
        toastMessage("error", "Fetching asset failed!", toast);
    })
}

export const getAssetById = (id, dispatcher ) => {
    axios.get(getAssetBy.id + id)
    .then((response) => {
        dispatcher(setAsset(response?.data?.asset));
    })
    .catch(() => {
        toastMessage("error", "Fetching asset failed!", toast);
    })
}