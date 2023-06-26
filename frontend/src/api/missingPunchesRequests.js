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

export const getMissingPunchesRquestsOfUser = (id) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    const currentYear = currentDate.getFullYear();
    return axios
      .get(missingPunchesRoute.getMissingPunchesHistoryByUserId+`?userId=${id}&month=${currentMonth}&year=${currentYear}`)
      .then((response) => response.data.response)
      .catch((err) => {
        console.log(err);
      });
  };