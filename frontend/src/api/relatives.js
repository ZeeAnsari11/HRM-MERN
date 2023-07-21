import axios from "axios";
import { relatives } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setClickState, setUserRelatives } from "../states/reducers/slices/backend/RelativesSlice";
import { setProfileCompletion } from "../states/reducers/slices/backend/UserSlice";

export const createRelative = (data, trigger) => {
    console.log("Crate called")
    axios.post(relatives.createRelative, data)
    .then(() => {
        toastMessage('success', "Relative Created Successfully", toast);
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

export const getRelatives = (userId, dispatcher) => {
    axios.get(relatives.getRealtives+userId)
    .then((response) => {
        dispatcher(setUserRelatives(response.data.response))
        if (response.data.response.length > 0) dispatcher(setProfileCompletion(10))
    })
    .catch((err) => {
        if (err.response.status !== 404) toastMessage('error', err.response.data.Message, toast);
    })
}

export const updateRelative = (relative_id, relative, dispatcher, trigger) => {
    axios.put(relatives.updateRelative+relative_id, relative)
    .then((response) => {console.log(response)})
    .catch((err) => { toastMessage('error', err.response.data.Message, toast) })
    .finally(() => { 
        trigger();
        resetStates(dispatcher);
    })
}

export const deleteRelative = (relative_id, dispatcher) => {
    axios.delete(relatives.deleteRelative+relative_id)
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