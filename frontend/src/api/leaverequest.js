import { deleteLeave, leaveRequestRoutes, leaveType, shortLeaveRoutes, updateLeave, userLeaveRoute } from "./configuration"
import axios from 'axios';
import { setLeaveTypes, setShortLeaveTypes, setUserLeaves } from "../states/reducers/slices/backend/LeaveRequest";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const getLeaveRequestByOrganizationId = (org_id, dispatcher) => {
    axios.get(leaveRequestRoutes.getLeaveTypes+org_id)
    .then((response) => {
        dispatcher(setLeaveTypes(response.data.data))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getShortLeaveTypesByOrganizationId = (org_id, dispatcher) => {
    axios.get(shortLeaveRoutes.getShortLeaveTypes+org_id)
    .then((response) => {
        console.log(response.data.response);
        dispatcher(setShortLeaveTypes(response.data.response))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const saveFormData = (formData) => {
    axios.post(leaveRequestRoutes.setUserLeave, formData)
    .then((response) => {
       console.log(response.data.message);
    })
    .catch((err) => {
        console.log(err);
    })
}

export const deleteLeaveRequest = (id) => {
    axios.delete(deleteLeave.request + id)
    .then((response) => {
        toastMessage("success", "Leave Request Deleted Succefully", toast)
        setTimeout(() => {
            window.location.href = "/dashboard/leaves"
        }, 2000)
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}

export const getUserLeaves = (user_id, dispatcher) => {
    axios.get(userLeaveRoute.getUserLeaves+user_id)
    .then((response) => {
        dispatcher(setUserLeaves(response.data.leaves))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getLeaveTypeById = (leaveType_id, dispatcher) => {
    axios.get(leaveType.getLeaveType+leaveType_id)
    .then((response) => {
        dispatcher(setUserLeaves(response.data))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const updateLeaveRequest = (leave, id) => {
    axios.put(updateLeave.request + id, leave)
    .then((response) => {
        toastMessage("success", "Leave Request Updated Succefully", toast)
        setTimeout(() => {
            window.location.href = "/dashboard/leaves"
        }, 2000)
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}