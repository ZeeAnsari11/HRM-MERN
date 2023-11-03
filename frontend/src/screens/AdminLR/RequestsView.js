import { faCheckCircle, faPencil, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GlobalRequestForm } from './GlobalRequestForm';
import Modal from '../../components/Modal';
import React from 'react';
import { updateLoanTypeById } from '../../api/LoanType';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function RequestsView({ data }) {
    let orgId = useSelector(selectCurrentUserOrg);
    let role = useSelector(selectCurrentUserRole);

    const [formData, setFormData] = useState({
        id: data.id,
    });
    const [validationErrors, setValidationErrors] = useState({
        type: "",
        designations: "",
    });

    const handleUpdateLoanType = (trigger) => {
        const newValidationErrors = {};



        if (Object.keys(newValidationErrors).length > 0) {
            // Set validation errors and prevent closing the modal
            setValidationErrors(newValidationErrors);
            trigger();
            return;
        }

        updateLoanTypeById(formData.id, formData, trigger, orgId, role);
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

    // const handleAction = (id) => {
    //     deleteLoanType(id);
    // }

    let icon;

    if (data.status === 'pending' || data.status === 'processing') {
        icon = (
            <FontAwesomeIcon
                icon={faPencil}
                className="text-backgroundDark cursor-pointer hover:text-gray-600"
            />
        );
    } else if (data.status === 'approved') {
        icon = (
            <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-green-500 cursor-not-allowed"
            />
        );
    } else if (data.status === 'rejected') {
        icon = (
            <FontAwesomeIcon
                icon={faTimesCircle}
                className="text-red-500 cursor-not-allowed"
            />
        );
    }

    return (
        <div className="flex items-center space-x-2 justify-center">
            <Modal
                action={icon}
                Element={<GlobalRequestForm leaveRequest={data} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
                btnConfig={ViewBtnConfig}
                check={(closeModal) => {
                    if (!validationErrors?.type && !validationErrors?.designations && formData?.type.trim() && formData.designations.length > 0) {
                        closeModal();
                    }
                }}
            />
            {/* DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED */}
        </div>
    );

    // return <div className="flex items-center space-x-2 justify-center">
    //          <Modal
    //         action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
    //         Element={<EditableLeaveRequestForm leaveRequest={data} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
    //         btnConfig={ViewBtnConfig}
    //         check={(closeModal) => {
    //             if (!validationErrors?.type && !validationErrors?.designations && formData?.type.trim() && formData.designations.length>0) {
    //                 closeModal()
    //             }
    //         }}
    //     />
    //     {
    //      //          DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED
    //      /* <button
    //         className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
    //         onClick={() => handleAction(data.id)}
    //     >
    //         <FontAwesomeIcon icon={faTrash}/>
    //     </button> */}
    // </div>
}