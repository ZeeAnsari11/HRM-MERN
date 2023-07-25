import { deleteDesiginationById, updateDesiginationById } from '../../api/designation';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import CUForm from '../Profile/elements/common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function DesiginationsView({ data }) {

    const [formData, setFormData] = useState({
        title: data.title,
        shortForm:data.shortForm
    });

    const handleUpdateDepartmennt = (trigger) => {
        updateDesiginationById(data.id, formData, trigger);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    let title = "Update Department"
    const formDataConfig = [
        {
            label: 'Title',
            type: 'text',
            name: 'title',
            value: formData.title,
            onChange: handleInputChange,
        },
        {
            label: 'shortForm',
            type: 'text',
            name: 'shortForm',
            value: formData.shortForm,
            onChange: handleInputChange,
        },
    ]

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]



    const handleAction = (id) => {
        console.log("=====1=======",id);
        deleteDesiginationById(id);
    }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            Element={<CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={false} />}
            btnConfig={btnConfig}

        />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}