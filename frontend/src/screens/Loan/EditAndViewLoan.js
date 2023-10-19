import { deletAllowanceById, updateAllowanceById } from '../../api/allowances';
import { deleteLoanById, updateLoanRequestById } from '../../api/loan';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import CreateLoanRequest from './CreateLoan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function EditAndViewLoan({ data }) {

    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);

    const [formData, setFormData] = useState({
        loan_amount: data.loan_amount,
        reason: data.reason,
        date: data.date,
        loan_type: data.loan_type,
        id: data.id
    });

    const [validationErrors, setValidationErrors] = useState({
        loan_amount: '',
        reason: '',
        date: '',
        loan_type: '',
    })


    const handleUpdateDepartmennt = (trigger) => {
        console.log("====callllllll======", formData);
        const newValidationErrors = {};
        if (formData.loan_amount === "") {
            newValidationErrors.loan_amount = "Loan amount is required.";
        }
        if (formData.reason === "") {
            newValidationErrors.reason = "Reason is required.";
        }
        if (formData.date === "") {
            newValidationErrors.date = "Date is required.";
        }
        if (formData.loan_type === "") {
            newValidationErrors.loan_type = "Loan Type is required.";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        updateLoanRequestById(orgId, role, data.id, formData,trigger)
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear validation error when user starts typing again
        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };

    let title = "Update Loan Request"

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]

    const handleAction = (id) => {
        deleteLoanById(orgId, role, id)
    }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            Element={<CreateLoanRequest formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
            btnConfig={btnConfig}
            check={(closeModal) => {
                if (!validationErrors?.loan_amount && !validationErrors?.reason && !validationErrors?.date && !validationErrors?.loan_type && formData?.loan_amount && formData?.reason && formData?.loan_type) {
                    closeModal()
                }
            }}
        />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}