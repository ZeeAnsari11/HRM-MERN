import axios from "axios";
import { qualification } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setUserQualifications, setClickState } from "../states/reducers/slices/backend/QualificationSlice";

export const createQualification = (data, trigger) => {
    axios.post(qualification.createQualification, data)
    .then(() => {
        toastMessage('success', "Qualification Added Successfully", toast);
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

export const getQualifications = (userId, dispatcher) => {
    axios.get(qualification.getQualifications+userId)
    .then((response) => {
        dispatcher(setUserQualifications(response.data.response))
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
}

export const updateQualification = (q_id, qualificationObj, dispatcher, trigger) => {
    axios.put(qualification.updateQualification+q_id, qualificationObj)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => { 
        toastMessage('error', err.response.data.Message, toast) 
    })
    .finally(() => { 
        trigger();
        resetStates(dispatcher);
    })
}

const resetStates = (dispatcher) => {
    dispatcher(setClickState({
        id: '',
        instituteName: '',
        degreeTitle:'',
        isDegreeCompleted: false,
        starting: '',
        ending: ''
    }))
}