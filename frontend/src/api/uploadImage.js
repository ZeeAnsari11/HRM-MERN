import { getCurrentUser } from "./user";
import { timeSlotsRoute } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const uploadFile = (formData, userId, setpic, dispatcher) => {
    fetch(`http://127.0.0.1:4000/api/v1/upload/${userId}`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json()) 
        .then((data) => {
            setpic(data.data); 
            getCurrentUser(dispatcher);
        })
        .catch((err) => {
            if (err.response.status !== 404) toastMessage('error', err.response.data.Message, toast);
        })
}

export const uploadLogoFile = (formData, orgId, dispatcher) => {
    fetch(`http://127.0.0.1:4000/api/v1/log/org/${orgId}`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json()) 
        .then((data) => {
            getCurrentUser(dispatcher);
        })
        .catch((err) => {
            if (err.response.status !== 404) toastMessage('error', err.response.data.Message, toast);
        })
}