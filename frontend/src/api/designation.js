import axios from "axios"
import { setDesignationName } from "../states/reducers/slices/backend/Designation";
import { getDesignation ,desiginationsRoute} from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const getDesignationById = (DesignationId, dispatcher) => {
    axios.get(getDesignation.byId+DesignationId)
    .then((response) => {
        console.log(response.data.response);
       dispatcher(setDesignationName(response.data.response))
    })
    .catch((err) => {
        toastMessage("error", err.response.data.Message, toast);
    })
}

export const createDesigination = (formData, changeToggler, trigger) => {
    axios.post(desiginationsRoute.createDesigination, formData)
    .then((response) => {
        changeToggler();
        toastMessage("success", "Designation created successfully", toast);
    })
    .catch((err) => {
        toastMessage("error", err.response.data.Message, toast);
    })
    .finally(() => {
        trigger();
    })
}