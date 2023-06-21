import axios from 'axios';
import { missingPunchesRoute } from './configuration';

export const saveFormDataForMissingPunches = (formData) => {
    axios.post(missingPunchesRoute.setUserMissingPunchesRquest, formData)
    .then((response) => {
       console.log("Form Data Saved Successfully for MissingPunches");
    })
    .catch((err) => {
        console.log(err);
    })
}