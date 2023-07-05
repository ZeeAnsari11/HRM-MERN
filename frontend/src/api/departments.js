import { departmentRoute, organizationRoutes } from "./configuration";
import axios from "axios";

export const createDepartment = (formData, changeToggler) => {
    axios.post(departmentRoute.createDepartment, formData)
        .then((response) => {
            console.log("department created successfully frontend");
            changeToggler();
        })
        .catch((err) => {
            console.log(err);
        })
}

export const getDepartmentsByOrgId = (orgId, setDepartment) => {
    axios.get(organizationRoutes.getDepartmentsByOrgId + orgId)
        .then((response) => {
            // console.log(response);
            setDepartment(response.data.departments)

        })
        .catch((err) => {
            console.log(err);
        })
}

