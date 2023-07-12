import axios from 'axios';
import { setTimeSheet, setUserWFH } from '../states/reducers/slices/backend/UserSlice';
import { createWfh, getAllWfh, getTime } from './configuration';
import { toastMessage } from '../AlertConfigs';
import { toast } from 'react-toastify';

export const CreateWfhRequest = (formData, toggler) => {
    axios.post(createWfh.request , formData)
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

export const getAllWfhOfUser = (userId, dispatcher) => {
    axios.get(getAllWfh.ofUser + userId)
    .then((response) => {
        dispatcher(setUserWFH(response.data.response));
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}

export const getTimeSheet = (data, dispatcher) => {
    axios.post(getTime.sheet, data)
    .then((response) => {
        dispatcher(setTimeSheet(response.data.response));
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}


