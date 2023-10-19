import { organizationRoutes, shortLeaveTypeRoute } from "./configuration";

import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { shortLeaveRoutes } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createShortLeaveType = (formData, changeToggler, trigger, orgId, role) => {
  const headers = setHeaders(orgId, role, 'createShortLeaveType');

  axios
    .post(shortLeaveTypeRoute.createShortLeaveType, formData, {headers})
    .then(() => {
      toastMessage("success", "Short Leave Type successfully,", toast);
      changeToggler();
    })
    .catch((err) => {
      toastMessage("error", err.response.data.Message, toast);
    })
    .finally(() => {
      trigger();
    });
};

export const getShortLeaveTypeByOrgId = (orgId, setLeaveType, trigger = null, role) => {
  const headers = setHeaders(orgId, role, 'getAllShortLeaveTypeByOrganization');

  axios
    .get(organizationRoutes.getShortLeaveTypeByOrgId + orgId, {headers})
    .then((response) => {
      setLeaveType(response.data.response);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() =>{
      if(trigger !== null){
          trigger()
      }
  })
};

export const updateShortLeaveTypeById = (id, formData, trigger, orgId, role) => {
  const headers = setHeaders(orgId, role, 'updateShortLeaveTypeById');

  axios
    .put(shortLeaveTypeRoute.updatShorteLeaveTypeById + id, formData, {headers})
    .then((response) => {
      toastMessage("success", response.data.Message, toast);
      //TODO: Update required
      setTimeout(() => {
        window.location.href = "/dashboard/short-leave-type";
      }, 2000);
    })
    .catch((error) => {
      toastMessage("error", error.response.data.Message, toast);
    })
    .finally(() => {
      trigger();
    });
};
