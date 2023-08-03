import axios from "axios"
import { organization } from "./configuration";
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