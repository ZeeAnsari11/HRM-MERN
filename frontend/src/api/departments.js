import { departmentRoute, organizationRoutes } from "./configuration";

import axios from "axios";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createDepartment = (formData, changeToggler, trigger = null) => {
  axios
    .post(departmentRoute.createDepartment, formData)
    .then(() => {
      toastMessage("success", "Department creation success.", toast);
      changeToggler();
    })
    .catch((err) => {
      toastMessage("error", "Department creation failed!", toast);
    })
    .finally(() => {
      if (trigger !== null) trigger();
    });
};

export const getDepartmentsByOrgId = (orgId, setDepartment) => {
  axios
    .get(organizationRoutes.getDepartmentsByOrgId + orgId)
    .then((response) => {
      setDepartment(response.data.departments);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteDepartmentById = (id) => {
  axios
    .delete(departmentRoute.deleteDepartmentById + id)
    .then((response) => {
      toastMessage("success", response.data.Message, toast);
      setTimeout(() => {
        window.location.href = "/dashboard/departments";
      }, 2000);
    })
    .catch((err) => {
      toastMessage("error", err.response.data.Message, toast);
    });
};

export const updateDepartmentById = (id, formData, trigger) => {
  axios
    .put(departmentRoute.updateDepartmentById + id, formData)
    .then((response) => {
      toastMessage("success", response.data.Message, toast);
      //TODO: Update required
      setTimeout(() => {
        window.location.href = "/dashboard/departments";
      }, 2000);
    })
    .catch((error) => {
      toastMessage("error", error.response.data.Message, toast);
    })
    .finally(() => {
      trigger();
    });
};
