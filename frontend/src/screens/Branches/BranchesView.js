import { deleteBranch, updateBranchById } from '../../api/branches';
import { faArrowAltCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import CBForm from './CBForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function BranchesView({ data }) {
    const [formData, setFormData] = useState({
        city: data.city,
        country: data.country,
        description: data.description,
        name: data.name,
    });
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        city: '',
        country: '',
        description: ''
      });

    const handleUpdateBranches = (trigger) => {
        const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.city.trim() === "") {
      newValidationErrors.city = "City Name is required.";
    }
    if (formData.country.trim() === "") {
      newValidationErrors.country = "Country Name is required.";
    }
    if (formData.description.trim() === "") {
      newValidationErrors.description = "Description Name is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    
        updateBranchById(data.id ,formData, trigger);
    };

    const ViewBtnConfig = [
        {
          title: 'Update',
          handler: handleUpdateBranches,
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
        deleteBranch(id);
    }

    return <div className="flex items-center space-x-2 justify-center">
            <Modal
                action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                title={''}
                Element={<CBForm handleInputChange={handleInputChange} formData={formData} validationErrors={validationErrors}/>}
                btnConfig={ViewBtnConfig}
                check={(closeModal) => {
                    if (!validationErrors?.name && !validationErrors?.city && !validationErrors?.country && !validationErrors?.description && formData?.name.trim() && formData?.city.trim() && formData?.country.trim() && formData?.description.trim()) {
                      closeModal()
                    }
                  }}
            />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    </div>
}