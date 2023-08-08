import { deleteBranch, updateBranchById } from '../../api/branches';
import { deleteDepartmentById, updateDepartmentById } from '../../api/departments';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import CUForm from '../Profile/elements/common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function DepartmentsView({ data }) {

    const [formData, setFormData] = useState({
        name: data.name,
    });
    const [validationErrors, setValidationErrors] = useState({
        name: "",
    });
    const handleUpdateDepartmennt = (trigger) => {
        updateDepartmentById(data.id, formData, trigger);
    };

    // const handleInputChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
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
            label: 'Name',
            type: 'text',
            name: 'name',
            value: formData.name,
            onChange: handleInputChange,
        },
        {
            label: <>Branch Name <span className='text-red-600 text-xs font-bold'>(Branch is not editable)</span></>,
            type: 'text',
            name: 'branch',
            value: data.branch
        }
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]



    const handleAction = (id) => {
        deleteDepartmentById(id);
    }

    return <div className="flex items-center justify-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            Element={<CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={false} />}
            btnConfig={btnConfig}
            check={(closeModal) => {
                if (!validationErrors?.name  && formData?.name.trim()) {
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