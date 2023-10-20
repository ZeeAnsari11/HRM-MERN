import { updateDepartmentById } from '../../api/departments';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import CUForm from '../Profile/elements/common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';
import { updateRequestTypeById } from '../../api/requestFlow';

export default function RequestTypeView({ data }) {

    const [formData, setFormData] = useState({
        name: data.name,
    });
    const [validationErrors, setValidationErrors] = useState({
        name: ""
    });

    const handleUpdateRequestType = (trigger) => {
        const newValidationErrors = {};
        if (formData.name.trim() === "") {
            newValidationErrors.name = "Name is required.";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        
        updateRequestTypeById(data.id, formData, trigger);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };
    
    let title = "Update Request Type"
    const formDataConfig = [
        {
            label: 'Name',
            type: 'text',
            name: 'name',
            value: formData.name,
            onChange: handleInputChange,
        },
        
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateRequestType,
    }]

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            Element={<CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={false} validationErrors={validationErrors}/>}
            btnConfig={btnConfig}
            check={(closeModal) => {
                if (!validationErrors?.name && !validationErrors?.branch && formData?.name.trim() && formData?.branch.trim()) {
                    closeModal()
                }
            }}

        />
    </div>
}