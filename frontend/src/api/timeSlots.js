import axios from "axios"
import { timeSlotsRoute } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const getTimeSlotsByOrgId = (orgId, setTimeSlots) => {
    axios.get(timeSlotsRoute.getTimeSlotsByOrgId+orgId)
    .then((response) => {
        console.log(response.data.response);
        setTimeSlots(response.data.response)
    })
    .catch((err) => {
        console.log(err);
    })
    
}

export const createTimeSlot = (formData, changeToggler, trigger) => {
    axios.post(timeSlotsRoute.createTimeSlot, formData)
    .then((response) => {
        changeToggler();
       console.log("Desigination created successfully frontend");
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        trigger();
    })
}