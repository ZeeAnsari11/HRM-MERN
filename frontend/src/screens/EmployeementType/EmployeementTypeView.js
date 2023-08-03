import { deleteEmployeementTypeById, updateEmployeementTypeById } from '../../api/employeementType';
import { faArrowAltCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import EmployeementTypeForm from './EmployeementTypeForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function EmployeementTypeView({ data }) {
    const [formData, setFormData] = useState({
        employmentType: data.employmentType,
    });

    const handleUpdateEmployeementType = (trigger) => {
        updateEmployeementTypeById(data.id ,formData, trigger);
    };

    const ViewBtnConfig = [
        {
          title: 'Update',
          handler: handleUpdateEmployeementType,
        },
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAction = (id) => {
        deleteEmployeementTypeById(id);
    }

    return <div className="flex items-center space-x-2 justify-center">
            <Modal
                action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                title={''}
                Element={<EmployeementTypeForm handleInputChange={handleInputChange} formData={formData}/>}
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