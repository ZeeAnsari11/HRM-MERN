import { organizationRoutes, shortLeaveTypeRoute } from "./configuration";

import axios from "axios";
import { shortLeaveRoutes } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createShortLeaveType = (formData, changeToggler, trigger) => {
    axios.post(shortLeaveTypeRoute.createShortLeaveType, formData)
        .then(() => {
            toastMessage("success", "Short Leave Type successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}


export const getShortLeaveTypeByOrgId = (orgId, setLeaveType) => {
    axios.get(organizationRoutes.getShortLeaveTypeByOrgId + orgId)
        .then((response) => {
            setLeaveType(response.data.response)
        })
        .catch((err) => {
            console.log(err);
        })
}

export const updateShortLeaveTypeById = (id, formData, trigger) => {
    axios.put(shortLeaveTypeRoute.updatShorteLeaveTypeById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/short-leave-type"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}