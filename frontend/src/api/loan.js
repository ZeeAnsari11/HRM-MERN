import { getLoanTypeBy, getUserLoan } from "./configuration";
import { setCreatingLoan, setLoanTypes, setUserLoan } from "../states/reducers/slices/backend/Loan";

import axios from "axios";

export const getUserLoanById = (userId, dispatcher) => {
    axios.get(getUserLoan.byId+userId)
    .then((response) => {
       dispatcher(setUserLoan(response.data.loans))
    })
    .catch((err) => {
        // console.log(err);
    })
}

export const getLoanType = (organizationId, dispatcher) => {
    axios.get(getLoanTypeBy.organization+organizationId)
    .then((response) => {
       dispatcher(setLoanTypes(response.data.response))
    })
    .catch((err) => {
        console.log(err);
    })
}


export const setCancel = (creatingLoanRequest, dispatcher) => {

    dispatcher(setCreatingLoan(creatingLoanRequest))
   
}

