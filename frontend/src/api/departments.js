import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";
import { departmentRoute, organizationRoutes } from "./configuration";
import axios from "axios";

export const createDepartment = (formData, changeToggler, toggler) => {
    axios.post(departmentRoute.createDepartment, formData)
        .then(() => {
            toastMessage("success", "Department creation success.", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", "Department creation failed!", toast);
        })
        .finally(()=>{
            toggler();
        })
}

export const getDepartmentsByOrgId = (orgId, setDepartment) => {
    axios.get(organizationRoutes.getDepartmentsByOrgId + orgId)
        .then((response) => {
            setDepartment(response.data.departments)
        })
        .catch((err) => {
            console.log(err);
        })
}
