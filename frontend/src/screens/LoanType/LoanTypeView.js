import React from 'react';
import MultiSelect from '../../components/SelectForm/MultiSelect';
import { useState } from 'react';
import { faArrowAltCircleRight, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../../components/Modal';
import { deleteLoanType, updateLoanTypeById } from '../../api/LoanType';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoanForm = ({handleInputChange, desiginationsList, formData}) => {
    return <form>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Create Loan Type Name</label>
            <input
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Select Designation(s) </label>
            <MultiSelect handleInputChange={handleInputChange} desiginations={desiginationsList} formData={formData} />
        </div>
    </form>
}


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

    return <div className="flex items-center space-x-2">
            <Modal
                action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                title={''}
                Element={<LoanForm handleInputChange={handleInputChange} desiginationsList={desiginationsList} formData={formData}/>}
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