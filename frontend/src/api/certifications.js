import { setClickState, setUserCertifications } from "../states/reducers/slices/backend/Certificates";

import axios from "axios";
import { certification } from "./configuration";
import { setProfileCompletion } from "../states/reducers/slices/backend/UserSlice";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createCertification = (data, trigger) => {
    axios.post(certification.createCertification, data)
    .then(() => {
        toastMessage('success', "Certification Added Successfully", toast);
        // setTimeout(() => {
        //     window.location.href = "/dashboard/profile"
        // }, 2000)
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
        if (response.data.response.length > 0) dispatcher(setProfileCompletion(10))
    })
    .catch((err) => {
        if (err.response.status !== 404) toastMessage('error', err.response.data.Message, toast);
    })
}

export const deleteCertifications = (id, dispatcher) => {
    axios.delete(certification.deleteCertification+id)
    .then((response) => { toastMessage('success', response.data.Message, toast) })
    .catch((err) => { toastMessage('error', err.response.data.Message, toast) })
    .finally(() => { 
        resetStates(dispatcher);
        setTimeout(() => {
            window.location.href = "/dashboard/profile"
        }, 2000)
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

export const resetStates = (dispatcher) => {
    dispatcher(setClickState({
        id: '',
        instituteName: '',
        certificateTitle:'',
        certificationYear: '',
    }))
}