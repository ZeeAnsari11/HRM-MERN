import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import EmployeementTypeForm from './EmployeementTypeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { updateEmployeementTypeById } from '../../api/employeementType';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function EmployeementTypeView({ data }) {
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);
    
    const [formData, setFormData] = useState({
        employmentType: data.employmentType,
    });

    const [validationErrors, setValidationErrors] = useState({
        employmentType: ''
    });

    const handleUpdateEmployeementType = (trigger) => {
        const newValidationErrors = {};
        if (formData.employmentType.trim() === "") {
            newValidationErrors.employmentType = "Employment Type is required.";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        updateEmployeementTypeById(data.id, formData, trigger, orgId, role);
    };

    const ViewBtnConfig = [
        {
            title: 'Update',
            handler: handleUpdateEmployeementType,
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear validation error when user starts typing again
        setValidationErrors({
            ...validationErrors,
            [name]: "",
        });
    };


    // const handleAction = (id) => {
    //     deleteEmployeementTypeById(id);
    // }

    return <div className="flex items-center space-x-2 justify-center">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={'Update EmployeementType'}
            Element={<EmployeementTypeForm handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors} />}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                if (!validationErrors?.employmentType && formData?.employmentType.trim()) {
                    closeModal()
                }
            }}
        />
        {
         //          DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED
        /* <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button> */}
    </div>
}