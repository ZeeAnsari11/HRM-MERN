import axios from "axios";
import { setOrganizationTheme } from "../states/reducers/slices/backend/UserSlice";
import { theme } from "./configuration";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createTheme = (data, dispatch, trigger) => {
    axios.post(theme.createTheme, data)
    .then(() => {
        toastMessage('success', "Theme Saved Successfully", toast);
    })
    .catch((err) => {
        toastMessage('error', err.response.data.Message, toast);
    })
    .finally(() => {
        trigger();
    })
}

export const updateTheme = (org_id, themeData, dispatcher, trigger) => {
    const data = {
        primary: themeData.primary,
        secondary: themeData.secondary,
        primary_dark: themeData.primary_dark,
        secondary_dark: themeData.secondary_dark,
    }
    axios.put(theme.updateTheme+org_id, data)
    .then(() => {
        toastMessage('success', "Theme Updated Successfully", toast)
        getAllTheme(org_id, dispatcher, trigger)
    })
    .catch((err) => {toastMessage('error', err.response.data.Message, toast)})
    .finally(() => { 
        trigger();
    })
}

export const getAllTheme = (id, dispatcher, setLoaded) => {
    axios.get(theme.getTheme+id)
    .then((response) => {
        dispatcher(setOrganizationTheme(response.data.response))
    })
    .catch(() => {})
    .finally(() => {
        if (setLoaded !== null) setLoaded(false);
    })
}