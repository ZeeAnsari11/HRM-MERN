import { desiginationsRoute, getDesignation } from "./configuration";

import axios from "axios"
import { setDesignationName } from "../states/reducers/slices/backend/Designation";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const getDesignationById = (DesignationId, dispatcher, trigger) => {
    axios.get(getDesignation.byId+DesignationId)
    .then((response) => {
        console.log(response.data.response);
       dispatcher(setDesignationName(response.data.response))
    })
    .catch((err) => {
        toastMessage("error", err.response.data.Message, toast);
    })
    .finally(() => {
        trigger();
    })
}

export const createDesigination = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createDesignation');
    axios.post(desiginationsRoute.createDesigination, formData, { headers })
    .then((response) => {
        changeToggler();
        toastMessage("success", "Designation created successfully", toast);
    })
    .catch((err) => {
        toastMessage("error", err.response.data.Message, toast);
    })
    .finally(() => {
        trigger();
    })
}

export const deleteDesiginationById = (id) => {
    axios.delete(desiginationsRoute.deleteDesiginationById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/Desiginations"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}
export const updateDesiginationById = (id, formData, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'updateDesignationById');

    axios.put(desiginationsRoute.updateDesiginationById + id, formData, { headers })
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            setTimeout(() => {
                window.location.href = "/dashboard/Desiginations"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            //TODO: Update required
            trigger();
        })
}
