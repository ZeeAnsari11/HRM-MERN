import { grades, gradesRoute, organizationRoutes } from "./configuration";

import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createGrades = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createGrade')

    axios.post(gradesRoute.createGrades, formData, {headers})
        .then(() => {
            toastMessage("success", "Grades created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger()
        })
}

export const getGradesByOrgId = (orgId, setGrades, role) => {
    const headers = setHeaders(orgId, role, 'getAllGrades')
    
    axios.get(organizationRoutes.getGradesByOrgId + orgId,{headers})
        .then((response) => {
            setGrades(response.data.grades)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteGrade = (id, orgId, role) => {
    const headers = setHeaders(orgId, role, 'deleteGradeById')

    axios.delete(gradesRoute.deleteGrades + id , {headers})
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            setTimeout(() => {
                window.location.href = "/dashboard/grades"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast)
        })
}

export const updateGrade = (id, data, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'updateGrade')

    axios.put(gradesRoute.updateGrades + id, data , {headers})
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            setTimeout(() => {
                window.location.href = "/dashboard/grades"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast)
        })
        .finally(() => {
            trigger();
        })
}