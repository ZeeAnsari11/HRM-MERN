import axios from "axios";
import { loanType } from "./configuration";
import { setHeaders } from "../utils/AdminStatus";
import { toast } from "react-toastify";
import { toastMessage } from "../AlertConfigs";

export const createLoanType = (formData, changeToggler, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'createLoanType');
    axios.post(loanType.createLoanType, formData, {headers})
        .then(() => {
            toastMessage("success", "Loan Type created successfully,", toast);
            changeToggler();
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
        .finally(() => {
            trigger();
        })
}

export const getLoanTypesByOrgId = (orgId, setAssetTypes, trigger = null, role) => {
    const headers = setHeaders(orgId, role, 'getAllLoanTypeByOrgId');
    axios.get(loanType.getAllowancesByOrgId + orgId,{headers})
        .then((response) => {
            setAssetTypes(response.data.response);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            if (trigger !== null) {
                trigger()
            }
        })
}

export const deleteLoanType = (id) => {
    axios.delete(loanType.deleteLoanTypeById + id)
        .then((response) => {
            toastMessage("success", response.data.Message, toast);
            //TODO: Update required
            setTimeout(() => {
                window.location.href = "/dashboard/loan-type"
            }, 2000)
        })
        .catch((err) => {
            toastMessage("error", err.response.data.Message, toast);
        })
}

export const updateLoanTypeById = (id, formData, trigger, orgId, role) => {
    const headers = setHeaders(orgId, role, 'UpdateLoanTypeById');
    axios.put(loanType.updateLoanTypeById + id, formData, {headers})
        .then((response) => {
            toastMessage("success", response.data.Message, toast)
            setTimeout(() => {
                window.location.href = "/dashboard/loan-type"
            }, 2000)
        })
        .catch((error) => {
            toastMessage("error", error.response.data.Message, toast)
        })
        .finally(() => {
            trigger();
        })
}
