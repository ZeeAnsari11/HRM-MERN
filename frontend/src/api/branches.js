import axios from "axios";
import { organizationRoutes } from "./configuration";
import { branchRoute } from "./configuration";

export const createBranch = (formData, changeToggler) => {
    axios.post(branchRoute.createBranch, formData)
        .then((response) => {
            console.log("branch created successfully frontend");
            changeToggler();
        })
        .catch((err) => {
            console.log(err);
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
