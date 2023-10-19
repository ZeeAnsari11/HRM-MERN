import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LTForm from './LTForm';
import Modal from '../../components/Modal';
import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { updateLeaveTypeById } from '../../api/leaveType';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function LeaveTypeView({ data }) {
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);
    
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
        updateLeaveTypeById(data.id, formData, trigger, orgId, role);
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
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={''}
            Element={<LTForm handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors} />}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                if (!validationErrors?.name && !validationErrors?.shortName && !validationErrors?.accumulativeCount && formData?.name.trim() && formData?.shortName.trim() && formData?.accumulativeCount) {
                    closeModal()
                }
            }}
        />
    </div>
}