import axios from "axios";
import { branchRoute } from "./configuration";
import { organizationRoutes } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createBranch = (formData, changeToggler, trigger) => {
    axios.post(branchRoute.createBranch, formData)
        .then(() => {
            toastMessage("success", "Branch created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getBranchesByOrgId = (orgId, setBranches,trigger = null) => {
    axios.get(organizationRoutes.getBranchesByOrgId + orgId)
        .then((response) => {
            setBranches(response.data.branches)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() =>{
            if(trigger !== null){
                trigger()
            }
        })
}

export const deleteBranch = (id) => {
    axios.delete(branchRoute.deleteBranchById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/branches"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateBranchById = (id, formData, trigger) => {
    axios.put(branchRoute.updateBranchById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/branches"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}