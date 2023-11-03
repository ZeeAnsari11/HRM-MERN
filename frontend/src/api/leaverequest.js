import { deleteLeave, leaveRequestRoutes, leaveType, organizationRoutes, shortLeaveRoutes, updateLeave, userLeaveRoute } from "./configuration"
import { setLeaveTypes, setShortLeaveTypes, setUserLeaves } from "../states/reducers/slices/backend/LeaveRequest";

import axios from 'axios';
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const getLeaveRequestByOrganizationId = (org_id, dispatcher, role) => {
    const headers = setHeaders(org_id, role, 'getLeaveTypeByOrgId')

    axios.get(organizationRoutes.getLeaveTypeByOrgId + org_id, { headers })
        // axios.get(leaveRequestRoutes.getLeaveTypes+org_id)
        .then((response) => {
            // dispatcher(setLeaveTypes(response.data.data))
            dispatcher(setLeaveTypes(response.data.response))
        })
        .catch((err) => {
            // console.log(err);
        })
}

export const GetUserAllowedLeaves = (user, org_id, role, setLeaveTypes) => {
    const headers = setHeaders(org_id, role, 'GetUserAllowedLeave')

    axios.get(userLeaveRoute.getUserAllowedLeaves + user, { headers })
        // axios.get(leaveRequestRoutes.getLeaveTypes+org_id)
        .then((response) => {
            // dispatcher(setLeaveTypes(response.data.data))
            // dispatcher(setLeaveTypes(response.data.response))
            setLeaveTypes(response.data.userAllowedLeaves.leaveTypeDetails)
        })
        .catch((err) => {
            // console.log(err);
        })
}

export const getShortLeaveTypesByOrganizationId = (org_id, dispatcher, trigger = null, role) => {
    // axios.get(shortLeaveRoutes.getShortLeaveTypes+org_id)
    const headers = setHeaders(org_id, role, 'getAllShortLeaveTypeByOrganization');

    axios
        .get(organizationRoutes.getShortLeaveTypeByOrgId + org_id, { headers })
        .then((response) => {
            // dispatcher(setShortLeaveTypes(response.data.response))
            dispatcher(setShortLeaveTypes(response.data.response))
            if (trigger !== null) {
                trigger()
            }
        })
        .catch((err) => {
            // console.log(err);
        })
}

export const saveFormData = (formData, orgId, role) => {
    const headers = setHeaders(orgId, role, 'addingLeaveRequest');
    axios.post(leaveRequestRoutes.setUserLeave, formData, {headers})
        .then(() => {
            toastMessage("success", "Leave Request created successfully,", toast);
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
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

export const getUserLeaves = (user_id, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'userLeaveRequests')
    axios.get(userLeaveRoute.getUserLeaves + user_id, { headers })
        .then((response) => {
            dispatcher(setUserLeaves(response.data.leaves))
        })
        .catch((err) => {
            // console.log(err);
        })
}

export const getLeaveTypeById = (leaveType_id, dispatcher) => {
    axios.get(leaveType.getLeaveType + leaveType_id)
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

export const getLeaveRequestsByOrganizationId = (org_id, role, setRequests, loanLoader) => {
const headers = setHeaders(org_id, role, 'getLeaveRequestsByOrgId')
    axios.get(organizationRoutes.getLeaveRequestsByOrgId + org_id, { headers })
        .then((response) => {
            setRequests(response.data.response)
            loanLoader()
        })
        .catch((err) => {
            // console.log(err);
        })
}