import axios from "axios";
import { relatives } from "./configuration";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";
import { setClickState, setUserRelatives } from "../states/reducers/slices/backend/RelativesSlice";

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
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
}

export const updateRelative = (relative_id, relative, dispatcher, trigger) => {
    console.log("relative_id",relative_id)
    console.log("relative",relative)
    console.log("Update called")
    axios.put(relatives.updateRelative+relative_id, relative)
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