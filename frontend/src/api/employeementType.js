import { branchRoute, employeementTypeRoute } from "./configuration";

import axios from "axios";
import { organizationRoutes } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createEmployeementType = (formData, changeToggler, trigger) => {
    axios.post(employeementTypeRoute.createEmployeementType, formData)
        .then(() => {
            toastMessage("success", "EmployeementType created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getEmployementTypesByOrgId = (orgId, setEmploymentTypes, trigger = null) => {
    axios.get(organizationRoutes.getEmployementTypesByOrgId + orgId)
        .then((response) => {
            setEmploymentTypes(response.data.response)
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

export const deleteEmployeementTypeById = (id) => {
    axios.delete(employeementTypeRoute.deleteEmployeementType + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/employeement-type"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateEmployeementTypeById = (id, formData, trigger) => {
    axios.put(employeementTypeRoute.updateEmployeementType + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/employeement-type"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}