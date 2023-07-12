import axios from "axios";
import { organizationRoutes } from "./configuration";
import { branchRoute } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

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

export const getBranchesByOrgId = (orgId, setBranches) => {
    axios.get(organizationRoutes.getBranchesByOrgId + orgId)
        .then((response) => {
            console.log(response);
            setBranches(response.data.branches)
        })
        .catch((err) => {
            console.log(err);
        })
}
