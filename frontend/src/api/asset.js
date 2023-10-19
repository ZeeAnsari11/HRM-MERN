import { allAssets, asset, assetManagment, assetType, getAsset, getAssetBy } from "./configuration";
import { setAllAssets, setAllocation, setAsset, setAssetHistory, setAssetTypes } from "../states/reducers/slices/backend/Assets";

import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const saveAssetFormData = (formData, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createAsset')

    axios.post(asset.setAsset, formData, {headers})
    .then(() => {
        toastMessage("success", "Asset created Successfully", toast);
    })
    .catch(() => {
        toastMessage("error", "Asset creation failed!", toast);
    })
}

export const getAssetTypesByOrganizationId = (organizationId, dispatcher, role) => {
    const headers = setHeaders(organizationId, role, 'getAllAssetTypeByOrgId')

    axios.get(assetType.getAssetType+organizationId, {headers})
    .then((response) => {
       dispatcher(setAssetTypes(response.data.response))
    })
    .catch((e) => {
        console.log(e)
    })
}

export const getAssetByOrganizationId = (organizationId, dispatcher,role) => {
    const headers = setHeaders(organizationId, role, 'getAssets')

    axios.get(allAssets.getAssets+organizationId, {headers})
    .then((response) => {
       dispatcher(setAllAssets(response.data.response))
    })
    .catch((e) => {
        console.log(e)
    })
}

export const AllocateDeallocateAsset = (formData, dispatcher, setShowLoading, orgId, role) => {
    const headers = setHeaders(orgId, role, 'AssetManagment')

    axios.put(assetManagment.manageAsset, formData, {headers})
    .then((response) => {
       dispatcher(setAllocation(formData))
       toastMessage("success", response.data.message, toast);
    })
    .catch((err) => {
        toastMessage("error", err.response.data.message, toast);
    })
    .finally(()=>{
        setShowLoading(false)
    })
}

export const getAssetHistoryById = (id , setHistory, orgId, role) => {
    const headers = setHeaders(orgId, role, 'getAssetById')

    axios.get(getAsset.byId + id, {headers})
    .then((response) => {
        setHistory(response?.data?.data);
    })
    .catch((err) => {
        toastMessage("error", err?.response?.data?.Message, toast);
    })
}

export const getAssetById = (id, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'getAssetById')

    axios.get(getAssetBy.id + id, {headers})
    .then((response) => {
        dispatcher(setAsset(response?.data?.asset));
    })
    .catch(() => {
        toastMessage("error", "Fetching asset failed!", toast);
    })
}