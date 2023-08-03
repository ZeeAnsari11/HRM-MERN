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
        branch: data.branches.map((branch) => {if(branch.name === data.branch) return branch}),
    });
    
    console.log(formData)

    const handleUpdateDepartmennt = (trigger) => {
        updateDepartmentById(data.id, formData, trigger);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            label: 'Branch Name',
            type: 'text',
            name: 'branch',
            value: data.branch,
            customElements: <select
                        name="branch"
                        id="branch"
                        value={ (formData?.branch.length > 0) ? formData?.branch[0]?._id : ""}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required>
                        <option value="" className="border border-gray-300 rounded-md px-3 py-2 w-full">Select Branches</option>
                        {data.branches.map((branch) => (
                            <option key={branch._id} value={branch._id}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
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

        />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}