import { missingPunchesRoute, organizationRoutes } from './configuration';

import axios from 'axios';
import { setHeaders } from "../utils/AdminStatus";
import { setmissingPunches } from '../states/reducers/slices/backend/UserSlice';
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

export const getMissingPunchesRquestsOfUser = (id, orgId, role, dispatch) => {

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    const currentYear = currentDate.getFullYear();
    const headers = setHeaders(orgId, role, 'getMissingPunchRequest')
    return axios
      .get(missingPunchesRoute.getMissingPunchesHistoryByUserId+`?userId=${id}&month=${currentMonth}&year=${currentYear}`,{headers})
      .then((response) => {
        dispatch(setmissingPunches(response.data.response))
    })
      .catch((err) => {
        
      });
  };

  export const getAllM_PByOrgId = (orgId, role, setRequests, loanLoader)=>{
    console.log("===orgId=",orgId);
    const headers = setHeaders(orgId, role, 'getAllWFHByOrgId')
      axios.get(organizationRoutes.getAllM_PByOrdId + orgId, { headers })
          .then((response) => {
              setRequests(response.data.response)
              loanLoader()
          })
          .catch((err) => {
              // console.log(err);
          })
  }