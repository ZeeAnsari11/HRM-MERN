import { createWfh, deleteRequest, getAllWfh, getTime, updateWfh } from './configuration';
import { setTimeSheet, setUserWFH } from '../states/reducers/slices/backend/UserSlice';

import axios from 'axios';
import { setHeaders } from '../utils/AdminStatus';
import { toast } from 'react-toastify';
import { toastMessage } from '../AlertConfigs';

export const CreateWfhRequest = (formData, toggler, org_id, role) => {
    const headers = setHeaders(org_id, role, 'creatingWFH');

    axios.post(createWfh.request , formData, {headers})
    .then((wfh) => {
        toastMessage("success", "Work From Home request generated successfully", toast);
    })
    .catch((error) => {
        toastMessage("error", error.response.data?.Message, toast);
    })
    .finally(()=>{
        toggler()
    })
}

export const getAllWfhOfUser = (userId, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'getAllWFHByUserId');
    
    axios.get(getAllWfh.ofUser + userId, {headers})
    .then((response) => {
        dispatcher(setUserWFH(response.data.response));
    })
    .catch((error) => {
        // console.log(error.response.data);
    });
}

export const getTimeSheet = (data, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'filterAttendance')
    axios.post(getTime.sheet, data, {headers})
    .then((response) => {
        dispatcher(setTimeSheet(response.data.response));
    })
    .catch((error) => {
        console.log(error.response.data);
    });
}

export const deleteWfhRequest = (id, orgId, role) => {
    const headers = setHeaders(orgId, role, 'deleteWFH')

    axios.delete(deleteRequest.wfh + id, {headers})
    .then((response) => {
        toastMessage("success", "WFH Deleted Succefully", toast)
        setTimeout(() => {
            window.location.href = "/dashboard/view-wfh"
        }, 2000)
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}

export const updateWfhRequest = (wfh, id, orgId, role) => {
    const headers = setHeaders(orgId, role, 'updateWFH')

    axios.put(updateWfh.request + id, wfh, {headers})
    .then((response) => {
        toastMessage("success", "WFH Updated Succefully", toast)
        setTimeout(() => {
            window.location.href = "/dashboard/view-wfh"
        }, 2000)
        console.log(response);
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}



