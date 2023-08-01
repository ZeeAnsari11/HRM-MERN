import { deleteBranch, updateBranchById } from '../../api/branches';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LTForm from './LTForm';
import Modal from '../../components/Modal';
import React from 'react';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { updateLeaveTypeById } from '../../api/leaveType';
import { useState } from 'react';

export default function LeaveTypeView({ data }) {
    const [formData, setFormData] = useState({
        shortName: data.shortName,
        accumulativeCount: data.accumulativeCount,
        name: data.name,
    });

    const handleUpdateLeaveType = (trigger) => {
        updateLeaveTypeById(data.id ,formData, trigger);
    };

    const ViewBtnConfig = [
        {
          title: 'Update',
          handler: handleUpdateLeaveType,
        },
    ];

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return <div className="flex items-center space-x-2">
            <Modal
                action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
                title={''}
                Element={<LTForm handleInputChange={handleInputChange} formData={formData}/>}
                btnConfig={ViewBtnConfig}
            />
    </div>
}