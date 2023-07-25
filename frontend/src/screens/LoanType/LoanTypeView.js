import { deleteLoanType, updateLoanTypeById } from '../../api/LoanType';
import { faArrowAltCircleRight, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';

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

    const handleUpdateLoanType = (trigger) => {
        updateLoanTypeById(formData.id ,formData, trigger);
    };

    const ViewBtnConfig = [
        {
          title: 'Update',
          handler: handleUpdateLoanType,
        },
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAction = (id) => {
        deleteLoanType(id);
    }

    return <div className="flex items-center space-x-2 justify-center">
            <Modal
                action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                title={''}
                Element={<LoanTypeForm handleInputChange={handleInputChange} desiginationsList={desiginationsList} formData={formData}/>}
                btnConfig={ViewBtnConfig}
            />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash}/>
        </button>
    </div>
}