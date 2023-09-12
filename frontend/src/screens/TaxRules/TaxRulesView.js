import { deleteTaxRulesById, updateTaxRulesById } from '../../api/taxRules';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import TRForm from './TRForm';
import { useState } from 'react';

export default function TaxRulesView({ data }) {
  const [formData, setFormData] = useState({
    fromAmount: data.fromAmount,
    toAmount: data.toAmount,
    fixRate: data.fixRate,
    percentage: data.percentage,
  });
  const [validationErrors, setValidationErrors] = useState({
    fromAmount: '',
    toAmount: '',
    fixRate: '',
    percentage: '',
  });

  const handleUpdateTaxRule = (trigger) => {
    const newValidationErrors = {};

    if (formData.fromAmount === "") {
      newValidationErrors.fromAmount = "From Amount is required.";
    }
    if (formData.toAmount === "") {
      newValidationErrors.toAmount = "To Amount is required.";
    }
    if (formData.fixRate === "") {
      newValidationErrors.fixRate = "fixRate is required.";
    }

    if (formData.percentage === "") {
      newValidationErrors.percentage = "percentage is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }

    updateTaxRulesById(data.id, formData, trigger);
  };

  const ViewBtnConfig = [
    {
      title: 'Update',
      handler: handleUpdateTaxRule,
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
    deleteTaxRulesById(id);
  }

  return <div className="flex items-center space-x-2 justify-center">
    <Modal
      action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
      title={''}
      Element={<TRForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} skip={true} />}
      btnConfig={ViewBtnConfig}
      check={(closeModal) => {
        if (!validationErrors?.ruleNo && !validationErrors?.fromAmount && !validationErrors?.toAmount && !validationErrors?.percentage && !validationErrors?.fixRate && formData?.ruleNo && formData?.fromAmount && formData?.toAmount && formData?.percentage && formData?.fixRate) {
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