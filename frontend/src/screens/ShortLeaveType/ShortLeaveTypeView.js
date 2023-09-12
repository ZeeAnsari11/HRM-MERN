import { faPencil } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import SLTForm from './SLTForm';
import { updateShortLeaveTypeById } from '../../api/shortLeaveType';
import { useState } from 'react';

export default function ShortLeaveTypeView({ data }) {
    const [formData, setFormData] = useState({
        name: data.name,
        shiftReductionInPercentage: data.shiftReductionInPercentage,
        balance: data.balance,
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        shiftReductionInPercentage: '',
        balance: '',
    })

    const handleUpdateLeaveType = (trigger) => {
        const newValidationErrors = {};
        if (formData.name.trim() === "") {
            newValidationErrors.name = "Name is required.";
        }
        if (Number(formData.shiftReductionInPercentage) < 20 || Number(formData.shiftReductionInPercentage) > 100) {
            newValidationErrors.shiftReductionInPercentage = "% is required b/w 20 and 100.";
        }
        console.log(Number(formData.balance), "momomo")
        if (Number(formData.balance) < 0.2 || Number(formData.balance) > 1) {
            newValidationErrors.balance = "Balance is required b/w 0 and 1";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        updateShortLeaveTypeById(data.id, formData, trigger);
    };

    const ViewBtnConfig = [
        {
            title: 'Update',
            handler: handleUpdateLeaveType,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear validation error when user starts typing again
        setValidationErrors({
            ...validationErrors,
            [name]: '',
        });
    };

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={''}
            Element={<SLTForm handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors} />}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                if (!validationErrors.name && !validationErrors.shiftReductionInPercentage && !validationErrors.balance && formData.name && formData.balance >= 0 && formData.balance <= 1 && formData.shiftReductionInPercentage >= 20 && formData.shiftReductionInPercentage <= 100) {
                    closeModal()
                }
            }}
        />
    </div>
}