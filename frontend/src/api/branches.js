import axios from "axios";
import { branchRoute } from "./configuration";
import { organizationRoutes } from "./configuration";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createBranch = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createBranch');

    axios.post(branchRoute.createBranch, formData, {headers})
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

export const getBranchesByOrgId = (orgId, setBranches, trigger = null, role) => {
    const headers = setHeaders(orgId, role, 'getBranchesByOrganization');

    axios.get(organizationRoutes.getBranchesByOrgId + orgId, { headers })
        .then((response) => {
            setBranches(response.data.branches)
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            if (trigger !== null) {
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

export const updateBranchById = (id, formData, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'updateBranch');
    
    axios.put(branchRoute.updateBranchById + id, formData, { headers })
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
        .finally(() => {
            trigger();
        })
}