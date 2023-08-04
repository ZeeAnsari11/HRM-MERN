import { allAssets, asset, assetManagment, assetType, getAsset } from "./configuration";
import { setAllAssets, setAllocation, setAssetHistory, setAssetTypes } from "../states/reducers/slices/backend/Assets";

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

export const AllocateDeallocateAsset = (formData, dispatcher) => {
    axios.put(assetManagment.manageAsset, formData)
    .then(() => {
       dispatcher(setAllocation(formData))
    })
    .catch(() => {
        toastMessage("error", "Updating assets failed!", toast);
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