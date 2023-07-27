import { deleteBranch, updateBranchById } from '../../api/branches';
import { faArrowAltCircleRight, faTrash } from '@fortawesome/free-solid-svg-icons';

import EmployeeEditForm from './EmployeeEditForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function EmployeesVieModal({ data }) {
    console.log("======data========", data);
    const [formData, setFormData] = useState({
        name: data.name,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        designation: data.designation,
        salary: data.salary,
        active: data.active,
        role: data.role,
        status: data.status,
        nicNumber: data.nicNumber,
        nicFrontAttachment: data.nicFrontAttachment,
        nicBackAttachment: data.nicBackAttachment,
        nicExpiry: data.nicExpiry,
        id: data.id,
        skills: data.skills,
        isLineManager: data.isLineManager,
        isTeamLead: data.isTeamLead,
        isFinalAuthority: data.isFinalAuthority,
        attendanceExempt: data.attendanceExempt,
        lineManager: data.lineManager,
        firstUser: data.firstUser,
        grade: data.grade,
        branch: data.branch,
        organization: data.organization,
        personalEmail: data.personalEmail,
        bloodGroup: data.bloodGroup,
        nationality: data.nationality,
        joiningDate: data.joiningDate,
        employmentType: data.employmentType,
        employeeType: data.employeeType,
        userDefinedCode: data.userDefinedCode,
        leaveTypeDetails: data.leaveTypeDetails,
        timeZone: data.timeZone,
        rehire: data.rehire,
        createdAt: data.createdAt,
        __v: data.__v,
        phoneNumber: data.phoneNumber,
        permanentAddress: data.permanentAddress,
        temporaryAddress: data.temporaryAddress,
    });

    const handleUpdateBranches = (trigger) => {
        updateBranchById(data.id, formData, trigger);
    };

    const ViewBtnConfig = [
        {
            title: 'Update',
            handler: handleUpdateBranches,
        },
    ];

    const handleInputChange = ({ target: { name, value } }) => {
        if (name === "roaster") {
            setFormData((formData) => ({
                ...formData,
                roaster: { ...formData.roaster, ...value },
            }));
        } else if (name === "timeslots") {
            setFormData((formData) => ({
                ...formData,
                userRoster: { ...formData.userRoster, timeslots: value },
            }));
        } else {
            setFormData((formData) => ({
                ...formData,
                [name]: value,
            }));
        }
    };

    const handleAction = (id) => {
        deleteBranch(id);
    }

    return <div className="flex items-center space-x-2 justify-center">
        <Modal
            action={<FontAwesomeIcon icon={faArrowAltCircleRight} />}
            title={''}
            Element={<EmployeeEditForm handleInputChange={handleInputChange} formData={formData} />}
            btnConfig={ViewBtnConfig}
        />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}