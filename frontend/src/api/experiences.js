import axios from "axios";
import { experiences } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setUserExperiences, setClickState } from "../states/reducers/slices/backend/Experiences";

export const createExperience = (data, trigger) => {
    console.log("Crate called")
    axios.post(experiences.createExperience, data)
    .then(() => {
        toastMessage('success', "Experience Added Successfully", toast);
        setTimeout(() => {
            window.location.href = "/dashboard/profile"
        }, 2000)
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
    .finally(() => {
        trigger();
    })
}

export const getExperiences = (userId, dispatcher) => {
    axios.get(experiences.getExperience+userId)
    .then((response) => {
        dispatcher(setUserExperiences(response.data.response))
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
}

export const updateExperience = (experience_id, experience, dispatcher, trigger) => {
    axios.put(experiences.updateExperience+experience_id, experience)
    .then((response) => {console.log(response)})
    .catch((err) => { toastMessage('error', err.response.data.Message, toast) })
    .finally(() => { 
        trigger();
        resetStates(dispatcher);
    })
}

const resetStates = (dispatcher) => {
    dispatcher(setClickState({
        id: '',
        name:'',
        relationship: '',                                 
        cellNumber: '',
        landLineNumber: '',
        isDependent: false,
    }))
}