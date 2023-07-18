import axios from "axios";
import { setAllAssets, setAllocation, setAssetHistory, setAssetTypes } from "../states/reducers/slices/backend/Assets";
import { asset, assetManagment, assetType, allAssets, getAsset } from "./configuration";

export const saveAssetFormData = (formData) => {
    axios.post(asset.setAsset, formData)
    .then((response) => {
       console.log("Form Data Saved Successfully");
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getAssetTypesByOrganizationId = (organizationId, dispatcher) => {
    axios.get(assetType.getAssetType+organizationId)
    .then((response) => {
       dispatcher(setAssetTypes(response.data.response))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getAssetByOrganizationId = (organizationId, dispatcher) => {
    axios.get(allAssets.getAssets+organizationId)
    .then((response) => {
       dispatcher(setAllAssets(response.data.response))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const AllocateDeallocateAsset = (formData, dispatcher) => {
    axios.put(assetManagment.manageAsset, formData)
    .then((response) => {
       dispatcher(setAllocation(formData))
       console.log(response)
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getAssetHistoryById = (id , setHistory) => {
    axios.get(getAsset.byId + id)
    .then((response) => {
        console.log("Response", response);
        setHistory(response?.data?.data);
    })
    .catch((err) => {
        console.log("errrrror",err);
    })
}