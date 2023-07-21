import axios from "axios";
import { experiences } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setUserExperiences, setClickState } from "../states/reducers/slices/backend/Experiences";
import { setProfileCompletion } from "../states/reducers/slices/backend/UserSlice";

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
        if (response.data.response.length > 0) dispatcher(setProfileCompletion(20))
    })
    .catch((err) => {
        if (err.response.status !== 404)  toastMessage('error', err.response.data.Message, toast);
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

export const deleteExperience = (id, dispatcher) => {
    axios.delete(experiences.deleteExperience+id)
    .then((response) => { toastMessage('success', response.data.Message, toast) })
    .catch((err) => { toastMessage('error', err.response.data.Message, toast) })
    .finally(() => { 
        resetStates(dispatcher);
        setTimeout(() => {
            window.location.href = "/dashboard/profile"
        }, 2000)
    })
}

export const resetStates = (dispatcher) => {
    dispatcher(setClickState({
        id: '',
        name:'',
        relationship: '',                                 
        cellNumber: '',
        landLineNumber: '',
        isDependent: false,
    }))
}