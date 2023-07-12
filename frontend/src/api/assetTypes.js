import axios from "axios";
import { assetType } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

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
