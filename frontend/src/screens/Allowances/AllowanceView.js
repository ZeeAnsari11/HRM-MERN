import { deletAllowanceById, updateAllowanceById } from '../../api/allowances';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import AllowanceForm from './AllowanceForm';
import CUForm from '../Profile/elements/common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function AllowanceView({ data }) {

    const [formData, setFormData] = useState({
        allowanceName: data.allowanceName,
        percrentageOfBaseSalary: data.percrentageOfBaseSalary
    });

    const [validationErrors, setValidationErrors] = useState({
        allowanceName: '',
        percrentageOfBaseSalary: ''
    })


    const handleUpdateDepartmennt = (trigger) => {
        const newValidationErrors = {};
        if (formData.allowanceName.trim() === "") {
            newValidationErrors.allowanceName = "Allowance Name is required.";
        }
        if (formData.percrentageOfBaseSalary === "") {
            newValidationErrors.percrentageOfBaseSalary = "% of Base Salary is required.";
        }

        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        updateAllowanceById(data.id, formData, trigger);
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

    let title = "Update Department"
    const formDataConfig = [
        {
            label: 'Allowance Name',
            type: 'text',
            name: 'allowanceName',
            value: formData.allowanceName,
            onChange: handleInputChange,
        },
        {
            label: 'Percrentage Of BaseSalary',
            type: 'text',
            name: 'percrentageOfBaseSalary',
            value: formData.percrentageOfBaseSalary,
            onChange: handleInputChange,
        },
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]

    const handleAction = (id) => {
        deletAllowanceById(id);
    }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            Element={<AllowanceForm formData={formData} config={formDataConfig} handleInputChange={handleInputChange}  validationErrors ={validationErrors}/>}
            btnConfig={btnConfig}
            check={(closeModal) => {
                if (!validationErrors?.allowanceName && !validationErrors?.percrentageOfBaseSalary  && formData?.allowanceName.trim() && formData?.percrentageOfBaseSalary ) {
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