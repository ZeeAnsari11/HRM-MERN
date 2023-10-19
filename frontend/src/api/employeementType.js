import { branchRoute, employeementTypeRoute } from "./configuration";

import axios from "axios";
import { organizationRoutes } from "./configuration";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createEmployeementType = (formData, changeToggler, trigger,orgId, role,) => {
   const headers = setHeaders(orgId, role, 'createEmploymentType'); 

    axios.post(employeementTypeRoute.createEmployeementType, formData, {headers})
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

export const getEmployementTypesByOrgId = (orgId, setEmploymentTypes, trigger = null, role) => {
   const headers = setHeaders(orgId, role, 'getAllEmploymentTypesFromOrganizationId'); 
   
    axios.get(organizationRoutes.getEmployementTypesByOrgId + orgId, {headers})
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

export const updateEmployeementTypeById = (id, formData, trigger, orgId, role) => {
   const headers = setHeaders(orgId, role, 'updateEmploymentTypeById'); 
   
    axios.put(employeementTypeRoute.updateEmployeementType + id, formData, {headers})
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