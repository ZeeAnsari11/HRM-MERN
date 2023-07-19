import axios from "axios";
import { certification } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setUserCertifications, setClickState } from "../states/reducers/slices/backend/Certificates";

export const createCertification = (data, trigger) => {
    axios.post(certification.createCertification, data)
    .then(() => {
        toastMessage('success', "Certification Added Successfully", toast);
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

export const getCertifications = (userId, dispatcher) => {
    axios.get(certification.getCertifications+userId)
    .then((response) => {
        dispatcher(setUserCertifications(response.data.response))
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
}

export const updateCertification = (certificate_id, certificate, dispatcher, trigger) => {
    axios.put(certification.updateCertification+certificate_id, certificate)
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
        certificateTitle:'',
        certificationYear: '',
    }))
}