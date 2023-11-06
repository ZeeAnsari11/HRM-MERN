import { orgChart, organization, userChart } from "./configuration";

import axios from "axios"
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createOrganizationFirstUser = (data, navigation) => {
    axios.post(organization.createOrganization, data)
        .then(() => {
            toastMessage("success", "account created successfully,", toast);
            setTimeout(()=>{
                navigation('/login')
            },4000)
        })
        .catch((err) => {
            toastMessage("error", "Error creating account. try again later.", toast);
        })
} 
export const getOrgChart = (orgId, role, setLoader, setDataUser) => {
    axios
      .get(orgChart.details + orgId)
      .then((response) => {
        setDataUser(response.data)
        setLoader(false)
      })
      .catch((error) => { });
  };