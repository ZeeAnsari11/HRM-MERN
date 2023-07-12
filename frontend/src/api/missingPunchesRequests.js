import axios from 'axios';
import { missingPunchesRoute } from './configuration';
import { toastMessage } from '../AlertConfigs';
import { toast } from 'react-toastify';

export const saveFormDataForMissingPunches = (formData) => {
    axios.post(missingPunchesRoute.setUserMissingPunchesRquest, formData)
        .then(() => {
            toastMessage("success", "Data Saved Successfully for MissingPunches", toast)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message , toast);
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