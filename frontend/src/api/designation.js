import axios from "axios"
import { setDesignationName } from "../states/reducers/slices/backend/Designation";
import { getDesignation ,desiginationsRoute} from "./configuration";

export const getDesignationById = (DesignationId, dispatcher) => {
    axios.get(getDesignation.byId+DesignationId)
    .then((response) => {
        console.log(response.data.response);
       dispatcher(setDesignationName(response.data.response))
    })
    .catch((err) => {
        console.log(err);
    })
}

export const createDesigination = (formData, changeToggler) => {
    axios.post(desiginationsRoute.createDesigination, formData)
    .then((response) => {
        changeToggler();
       console.log("Desigination created successfully frontend");
    })
    .catch((err) => {
        console.log(err);
    })
}