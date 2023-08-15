import axios from 'axios';
import { paySlips } from './configuration';
import { setPayslips } from '../states/reducers/slices/backend/UserSlice';

export const getPayslips = (userId, dispatcher) => {
    axios.get(paySlips.ofUser + userId)
    .then((response) => {
        dispatcher(setPayslips(response.data.response));
    })
    .catch((error) => {
        // console.log(error.response.data);
    });
   
}