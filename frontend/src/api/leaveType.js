import axios from "axios";
import { leaveTypeRoute } from "./configuration";
import { organizationRoutes } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createLeaveType = (formData, changeToggler, trigger) => {
    axios.post(leaveTypeRoute.createLeaveType, formData)
        .then(() => {
            toastMessage("success", "Leave Type successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}


export const getLeaveTypeByOrgId = (orgId, setLeaveType, trigger = null) => {
    axios.get(organizationRoutes.getLeaveTypeByOrgId + orgId)
        .then((response) => {
            setLeaveType(response.data.response)
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

export const updateLeaveTypeById = (id, formData, trigger) => {
    axios.put(leaveTypeRoute.updateLeaveTypeById + id, formData)
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/leave-type"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}