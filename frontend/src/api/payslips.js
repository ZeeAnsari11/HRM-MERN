import axios from 'axios';
import { paySlips } from './configuration';
import { setPayslips } from '../states/reducers/slices/backend/UserSlice';
import { toastMessage } from '../AlertConfigs';
import { toast } from 'react-toastify';

export const getPayslips = (userId, dispatcher) => {
    axios.get(paySlips.ofUser + userId)
    .then((response) => {
        dispatcher(setPayslips(response.data.response));
    })
    .catch((error) => {
        // console.log(error.response.data);
    });
   
}

export const savePaySlipData = (organizationId, formData) => {
    axios.post(paySlips.generate + organizationId, formData)
    .then((response) => {
        toastMessage("success", "PaySlip Generated SuccessFully.", toast);
    })
    .catch((err) => {
        toastMessage("error", "PaySlip Generation Failed.", toast);
    })
}