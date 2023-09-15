import { assetType, grades, gradesRoute, organizationRoutes } from "./configuration";

import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createGrades = (formData, changeToggler, trigger) => {
    axios.post(gradesRoute.createGrades, formData)
        .then(() => {
            toastMessage("success", "Grades created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(()=>{
            trigger()
        })
}

export const getGradesByOrgId = (orgId, setGrades) => {
    axios.get(organizationRoutes.getGradesByOrgId + orgId)
        .then((response) => {
            setGrades(response.data.grades)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const deleteGrade = (id) => {
    axios.delete(gradesRoute.deleteGrades+id)
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

export const updateGrade = (id, data, trigger) => {
    axios.put(gradesRoute.updateGrades+id, data)
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