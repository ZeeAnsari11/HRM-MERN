import axios from "axios"
import { setDesignationName } from "../states/reducers/slices/backend/Designation";
import { getDesignation } from "./configuration";

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
