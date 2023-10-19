import axios from 'axios';
import { missingPunchesRoute } from './configuration';
import { setHeaders } from "../utils/AdminStatus";
import { toast } from 'react-toastify';
import { toastMessage } from '../AlertConfigs';

export const saveFormDataForMissingPunches = (formData, orgId, role) => {
    const headers = setHeaders(orgId,role, 'createMissingPunchRequest')
    axios.post(missingPunchesRoute.setUserMissingPunchesRquest, formData, {headers})
        .then(() => {
            toastMessage("success", "Data Saved Successfully for MissingPunches", toast)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message , toast);
        })
}

export const getMissingPunchesRquestsOfUser = (id, orgId, role) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    const currentYear = currentDate.getFullYear();
    const headers = setHeaders(orgId, role, 'getMissingPunchRequest')
    return axios
      .get(missingPunchesRoute.getMissingPunchesHistoryByUserId+`?userId=${id}&month=${currentMonth}&year=${currentYear}`,{headers})
      .then((response) => response.data.response)
      .catch((err) => {
        // console.log(err);
      });
  };