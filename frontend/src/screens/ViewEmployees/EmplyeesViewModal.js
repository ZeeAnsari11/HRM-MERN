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
    fullName: data.firstName + " " + data.lastName,
    designationTitle: data.designation?.title,
      HOD : {
        department : data.HOD?.department,
        isHOD : data.HOD?.isHOD
      },
      areaBounded : {
        isBounded : data.areaBounded?.isBounded
      },
      attendanceExempt : data.attendanceExempt,
      "blood-group" : data.bloodGroup,
      branch : data.branch,
      createdAt : data.createdAt,
      designation : data.designation,
      drivingLiscence :{
        number : data.drivingLiscence?.number
      },
      email : data.email,
      employeeType : data.employeeType,
      employmentType : data.employmentType,
      firstName : data.firstName,
      firstUser : data.firstUser,
      grade : data.grade,
      grossSalary : data.grossSalary,
      isActive : data.isActive,
      isFinalAuthority : data.isFinalAuthority,
      isLineManager : data.isLineManager,
      isTeamLead : data.isTeamLead,
      joiningDate : data.joiningDate,
      lastName : data.lastName,
      lineManager : data.lineManager,
      nationality : data.nationality,
      nic : {
        attachment : {
          back : data.nic?.attachment?.back,
          front: data.nic?.attachment?.front
        },
        expiry : data.nic?.expiry,
        number : data.nic?.number,
      },
      organization : data.organization,
      passport : {
        number : data.passport?.number,
      },
      permanentAddress : data.permanentAddress,
      personalEmail : data.personalEmail,
      phoneNumber : data.phoneNumber,
      probation :{
        isOnProbation : data.probation?.isOnProbation,
        status : data.probation?.status
      },
      roleType : data.roleType,
      temporaryAddress : data.temporaryAddress,
      timeZone : data.timeZone,
      userDefinedCode: data.userDefinedCode,
      userRoster:{
        restDays : data.userRoster?.restDays,
        timeSlots : data.userRoster?.timeSlots
      },
      id : data._id
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