import { deleteLoanType, updateLoanTypeById } from '../../api/LoanType';
import { faArrowAltCircleRight, faEye, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoanTypeForm from './LoanTypeForm';
import Modal from '../../components/Modal';
import MultiSelect from '../../components/SelectForm/MultiSelect';
import React from 'react';
import { useState } from 'react';

export default function LoanTypeView({ data, desiginationsList }) {
    const [formData, setFormData] = useState({
        id: data.id,
        type: data.type,
        designations: data.designations,
    });
    const [validationErrors, setValidationErrors] = useState({
        type: "",
        designations: "",
    });
    
    const handleUpdateLoanType = (trigger) => {
        const newValidationErrors = {};
        if (formData.type.trim() === "") {
            newValidationErrors.type = "Type is required.";
        }
        if (formData.designations === "" || formData.designations == undefined || formData.designations.length <=0) {
            newValidationErrors.designations = "Select at least one designation";
        }

        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }
        
        updateLoanTypeById(formData.id ,formData, trigger);
    };

    const ViewBtnConfig = [
        {
          title: 'Update',
          handler: handleUpdateLoanType,
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
            Element={<LoanTypeForm formData={formData} handleInputChange={handleInputChange} desiginationsList={desiginationsList} validationErrors={validationErrors} />}
            btnConfig={ViewBtnConfig}
            check={(closeModal) => {
                console.log("ready to close")
                if (!validationErrors?.type && !validationErrors?.designations && formData?.type.trim()) {
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
            <FontAwesomeIcon icon={faTrash}/>
        </button> */}
    </div>
}