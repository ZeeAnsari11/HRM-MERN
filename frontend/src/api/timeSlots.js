import axios from "axios"
import { timeSlotsRoute } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const getTimeSlotsByOrgId = (orgId, setTimeSlots, trigger = null) => {
    axios.get(timeSlotsRoute.getTimeSlotsByOrgId+orgId)
    .then((response) => {
        setTimeSlots(response.data.response)
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() =>{
        if(trigger !== null){
            trigger()
        }
    })
    
}

export const createTimeSlot = (formData, changeToggler, trigger) => {
    axios.post(timeSlotsRoute.createTimeSlot, formData)
    .then((response) => {
        toastMessage("success", "Asset Type created successfully,", toast);
        changeToggler();

    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        trigger();
    })
}

export const deleteTimeSlotById = (id) => {
    axios.delete(timeSlotsRoute.deleteTimeSlotById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            setTimeout(() => {
                window.location.href = "/dashboard/timeSlots"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateTimeSlotById = (id, formData, trigger) => {
    axios.put(timeSlotsRoute.updateTimeSlotById + id, formData)
        .then((response) => {
            toastMessage("success", "TimeSlot Updated Successfully", toast)
             //TODO: Update required
             setTimeout(() => {
                window.location.href = "/dashboard/timeSlots"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(()=>{
            trigger();
        })
}