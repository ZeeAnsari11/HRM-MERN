import axios from 'axios';
import { setPayslips } from '../states/reducers/slices/backend/UserSlice';
import { paySlips } from './configuration';

export const getPayslips = (userId, dispatcher) => {
    axios.get(paySlips.ofUser + userId)
    .then((response) => {
        dispatcher(setPayslips(response.data.response));
    })
    .catch((error) => {
        console.log(error.response.data);
    });
   
}