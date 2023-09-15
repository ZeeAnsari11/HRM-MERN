import { deleteLoanType, updateLoanTypeById } from '../../api/LoanType';
import { faArrowAltCircleRight, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GradeBenefitsForm from './GradeBenefitsForm';
import LoanTypeForm from './GradeBenefitsForm';
import Modal from '../../components/Modal';
import MultiSelect from './MultiSelect';
import React from 'react';
import { updateGradeBenefitsById } from '../../api/gradeBenefits';
import { useState } from 'react';

export default function GradeBenefitsView({ data, gradesList }) {
    const [formData, setFormData] = useState({
        id: data.id,
        name: data.name,
        description: data.description,
        grade: data.grade,
    });
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        grade: '',
        description: '',
    });

    const handleGradeBenefit = (trigger) => {
        const newValidationErrors = {};
        if (formData.name.trim() === "") {
            newValidationErrors.name = "Name is required.";
        }
        if (formData.description.trim() === "") {
            newValidationErrors.description = "Description is required.";
        }
        if (formData.grade === "" || formData.grade == undefined || formData.grade.length <= 0) {
            newValidationErrors.grade = "Select at least one grade";
        }
        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }

        updateGradeBenefitsById(formData.id, formData, trigger);
    };

    const ViewBtnConfig = [
        {
            title: 'Update',
            handler: handleGradeBenefit,
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

    const handleAction = (id) => {
        deleteLoanType(id);
    }

    return <div className="flex items-center space-x-2 justify-center">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            Element={<GradeBenefitsForm formData={formData} handleInputChange={handleInputChange} gradesList={gradesList} validationErrors={validationErrors} />}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                if (!validationErrors?.name && !validationErrors?.grade && !validationErrors?.description && formData?.name.trim() && formData?.description.trim()) {
                    closeModal()
                }
            }
            }
        />
        {
         //          DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED
         /* <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button> */}
    </div>
}