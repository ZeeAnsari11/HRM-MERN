import axios from 'axios';
import { paySlips } from './configuration';
import { setPayslips } from '../states/reducers/slices/backend/UserSlice';
import { toast } from 'react-toastify';
import { toastMessage } from '../AlertConfigs';

export const getPayslips = (userId, dispatcher) => {
    axios.get(paySlips.ofUser + userId)
    .then((response) => {
        dispatcher(setPayslips(response.data.response));
    })
    .catch((error) => {
        // console.log(error.response.data);
    });
   
}

export const getPayslipsOrg = (organizationId, dispatcher) => {
    axios.get(paySlips.ofOrganizarion + organizationId)
    .then((response) => {
        dispatcher(setPayslips(response.data.response));
    })
    .catch((error) => {
        // console.log(error.response.data);
    });
}

export const savePaySlipData = (organizationId, formData) => {
    axios.post(paySlips.generate + organizationId, formData)
    .then(() => {
        toastMessage("success", "Payslips generated successfully", toast);
    })
    .catch((error) => {
        toastMessage("error", error.response.data.Message, toast);
    })
}