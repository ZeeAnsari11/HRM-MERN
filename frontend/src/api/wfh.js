import axios from 'axios';
import { setTimeSheet, setUserWFH } from '../states/reducers/slices/backend/UserSlice';
import { createWfh, getAllWfh, getTime } from './configuration';

export const CreateWfhRequest = (formData) => {
    axios.post(createWfh.request , formData)
    .then((wfh) => {
        console.log("Message", wfh.data);
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
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
        console.log("response",response.data.response);
        dispatcher(setTimeSheet(response.data.response));
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}


