import { deleteBranch, updateBranchById } from '../../api/branches';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LTForm from './LTForm';
import Modal from '../../components/Modal';
import React from 'react';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { updateLeaveTypeById } from '../../api/leaveType';
import { useState } from 'react';

export default function LeaveTypeView({ data }) {
    const [formData, setFormData] = useState({
        shortName: data.shortName,
        accumulativeCount: data.accumulativeCount,
        name: data.name,
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        shortName: '',
        accumulativeCount: '',
    })

    const handleUpdateLeaveType = (trigger) => {
        const newValidationErrors = {};
        if (formData.name.trim() === "") {
            newValidationErrors.name = "Name is required.";
        }
        if (formData.shortName.trim() === "") {
            newValidationErrors.shortName = "Short Name is required.";
        }
        if (formData.accumulativeCount === "") {
            newValidationErrors.accumulativeCount = "Accumulative Count is required.";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        updateLeaveTypeById(data.id, formData, trigger);
    };

    const ViewBtnConfig = [
        {
            title: 'Update',
            handler: handleUpdateLeaveType,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
            title={''}
            Element={<LTForm handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors}/>}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                if (!validationErrors?.name && !validationErrors?.shortName && !validationErrors?.accumulativeCount && formData?.name.trim() && formData?.shortName.trim() && formData?.accumulativeCount) {
                    closeModal()
                }
            }}
        />
    </div>
}