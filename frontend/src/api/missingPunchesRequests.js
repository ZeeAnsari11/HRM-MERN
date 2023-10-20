import axios from 'axios';
import { missingPunchesRoute } from './configuration';
import { toast } from 'react-toastify';
import { toastMessage } from '../AlertConfigs';
import { setmissingPunches } from '../states/reducers/slices/backend/UserSlice';

export const saveFormDataForMissingPunches = (formData) => {
    axios.post(missingPunchesRoute.setUserMissingPunchesRquest, formData)
        .then(() => {
            toastMessage("success", "Data Saved Successfully for MissingPunches", toast)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message , toast);
        })
}

export const getMissingPunchesRquestsOfUser = (id, dispatch) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    const currentYear = currentDate.getFullYear();
    return axios
      .get(missingPunchesRoute.getMissingPunchesHistoryByUserId+`?userId=${id}&month=${currentMonth}&year=${currentYear}`)
      .then((response) => {
        dispatch(setmissingPunches(response.data.response))
    })
      .catch((err) => {
        
      });
  };