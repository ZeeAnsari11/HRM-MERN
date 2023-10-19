import { deletAllowanceById, updateAllowanceById } from '../../api/allowances';
import { deleteLoanById, updateLoanRequestById } from '../../api/loan';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import CreateLoanRequest from './CreateLoan';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoanDetails from './LoanDetails';
import Modal from '../../components/Modal';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function OpenLoanModal(data) {
console.log("====data====",data);
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);

    const [formData, setFormData] = useState(data);
    console.log("====formData====",formData);

    const handleUpdateDepartmennt = (trigger) => {
        updateLoanRequestById(orgId, role, data.id, formData,trigger)
    };

    const handleInputChange = (e) => {
    };

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]

    const handleAction = (id) => {
        deleteLoanById(orgId, role, id)
    }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={''}
            Element={<LoanDetails formData={formData} handleInputChange={handleInputChange} />}
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