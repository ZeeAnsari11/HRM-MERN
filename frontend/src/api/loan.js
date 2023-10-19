import { createLoanRequest, getLoanTypeBy, getUserLoan } from "./configuration";
import { selectCurrentUserOrg, selectCurrentUserRole } from "../states/reducers/slices/backend/UserSlice";
import { setCreatingLoan, setLoanTypes, setUserLoan } from "../states/reducers/slices/backend/Loan";

import axios from "axios";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";
import { useSelector } from "react-redux";

export const createLoan = (formData, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createLoan');

    axios.post(createLoanRequest.create, formData, { headers })
        .then(() => {
            toastMessage("success", "Loan Request created successfully,", toast);
            setTimeout(() => {
                window.location.href = "/dashboard/applied-loans"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const getUserLoanById = (userId, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'getAllLoansByUserId');

    axios.get(getUserLoan.byId + userId, { headers })
        .then((response) => {
            dispatcher(setUserLoan(response.data.loans))
        })
        .catch((err) => {
            // console.log(err);
        })
}

export const getLoanType = (organizationId, dispatcher, orgId, role) => {
    const headers = setHeaders(orgId, role, 'getAllLoanTypeByOrgId');

    axios.get(getLoanTypeBy.organization + organizationId, { headers })
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


export const getAllLoansByOrgId = (orgId, loanLoader, role, setLoanTypes) => {
    const headers = setHeaders(orgId, role, 'getAllLoans');

    axios.get(createLoanRequest.getAll + orgId, { headers })
        .then((response) => {
            setLoanTypes(response.data.response)
            loanLoader();
        })
        .catch((err) => {
            console.log(err);
        })
}


export const getLoansByUserId = (orgId, setAllLoans, allowanceLoader, role, userId) => {
    const headers = setHeaders(orgId, role, 'getAllLoans');

    axios.get(createLoanRequest.getAllLoansByUser + userId, { headers })
        .then((response) => {
            setAllLoans(response.data.loans)
            allowanceLoader();
        })
        .catch((err) => {
            console.log(err);
        })
}

export const updateLoanRequestById = (orgId, role, id, formData, trigger) => {
    const headers = setHeaders(orgId, role, 'updateLoanById');

    axios.put(createLoanRequest.updateLoanRequest + id, formData, { headers })
        .then(() => {
            toastMessage("success", "Loan Request Updated successfully,", toast);
            setTimeout(() => {
                window.location.href = "/dashboard/applied-loans"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const deleteLoanById = (orgId, role, id) => {

    const headers = setHeaders(orgId, role, 'deleteLoanById');
    axios.delete(createLoanRequest.deleteLoanRequest + id, { headers })
        .then(() => {
            toastMessage("success", "Loan Request deleted successfully,", toast);
            setTimeout(() => {
                window.location.href = "/dashboard/applied-loans"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const LoanRepaymentSchedule = (id, data, orgId, role) => {

    const headers = setHeaders(orgId, role, 'updateLoanRepaymentScheduleById');
    axios.post(createLoanRequest.loanRepqymentSchedule + id, { headers }, data)
        .then((response) => {
            console.log("", response.data)
            toastMessage("success", "Loan Repayment processed successfully,", toast);
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}