import React, { useEffect } from 'react'
import { selectCurrentUserBranch, selectCurrentUserOrg, selectFinalAuthority, selectTimeSlots } from '../../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'
import RestDays from './RestDays';
import SelectForm from '../../../components/SelectForm';
import { commonStyles } from '../../../styles/common';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { loadAllOrganizationsInfo } from '../../../api/user';
import { selectEmploymentTypes } from '../../../states/reducers/slices/backend/EmploymentType';
import { selectOrganizationDesignation } from '../../../states/reducers/slices/backend/Designation';
import { selectUserDepartment } from '../../../states/reducers/slices/backend/Department';

const OrganizationInfo = ({ formData, changePageNumber, handleInputChange, showButton }) => {
    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    const branchId = useSelector(selectCurrentUserBranch);
    const departments = useSelector(selectUserDepartment);
    const designations = useSelector(selectOrganizationDesignation);
    const lineManager = useSelector(selectFinalAuthority);
    const timeSlots = useSelector(selectTimeSlots);

    const timeSlotValue = formData.timeSlots ? formData.timeSlots.timeSlots : '';
    const restDaysValue = formData.roaster ? formData.roaster.restDays : [];
    const employmentTypes = useSelector(selectEmploymentTypes)

    const employeeTypes = [
        {
            name: 'field',
        },
        {
            name: 'non-field'
        }
    ];

    useEffect(() => {
        loadAllOrganizationsInfo(dispatcher, userOrgId, branchId);
    }, []);

    const convertToAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const minute = parseInt(minutes, 10);
        const meridiem = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        const formattedMinute = minute.toString().padStart(2, '0');
    
        return `${formattedHour}:${formattedMinute} ${meridiem}`;
    };
    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Department</label>
                <div className="flex space-x-2">
                    <select name='department' id="department" value={formData.department} onChange={handleInputChange} className={commonStyles.input} required>
                        <option value={''}>Select Department</option>
                        {
                            departments.map((department) => {
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        }
                    </select>
                    <Link to={'/dashboard/departments'} className='bg-gray-100 flex justify-center items-start rounded-md hover:bg-gray-300'><FontAwesomeIcon icon={faPlus} className='w-3 h-3 p-4'/></Link>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Designation</label>
                <div className="flex space-x-2">
                    <select name='designation' id="designation" value={formData.designation} onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Designation</option>
                        {
                            designations.map((designation) => {
                                return <option key={designation._id} value={designation._id}>{designation.title}</option>
                            })
                        }
                    </select>
                    <Link to={'/dashboard/desiginations'} className='bg-gray-100 flex justify-center items-start rounded-md hover:bg-gray-300'><FontAwesomeIcon icon={faPlus} className='w-3 h-3 p-4'/></Link>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employment Type</label>
                <div className="flex space-x-2">
                    <select name='employmentType'  id="employmentType" value={formData.employmentType} onChange={handleInputChange} className={commonStyles.input} required>
                        <option value={''}>Select Employment Type</option>
                        {
                            employmentTypes.map((employmentType) => {
                                return <option key={employmentType._id} value={employmentType._id}>{employmentType.employmentType}</option>
                            })
                        }
                    </select>
                    <Link to={'/dashboard/employeement-type'} className='bg-gray-100 flex justify-center items-start rounded-md hover:bg-gray-300'><FontAwesomeIcon icon={faPlus} className='w-3 h-3 p-4'/></Link>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employee Type</label>
                <div className="flex space-x-2">
                    <select 
                        name='employeeType'  
                        id="employeeType" 
                        value={formData.employeeType} 
                        onChange={handleInputChange} 
                        className={commonStyles.input}  
                        required>
                        <option value={''}>Select Employee Type</option>
                        {
                            employeeTypes.map((employeeType) => {
                                return <option key={employeeType.name} value={employeeType.name}>{employeeType.name}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="md:col-span-5">
                <p>Line Manager</p>
                {(lineManager.length > 0) && <SelectForm name='lineManager' title={'Line Manager'} people={lineManager} handleInputChange={handleInputChange} value={formData.lineManager} />}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="timeSlots">Roster</label>
                <div className="flex space-x-2">
                    <select name='timeSlots' value={timeSlotValue} onChange={(event) => {
                        let val = event.target.value
                        handleInputChange({ target: { name: 'timeSlots', value: { timeSlots: val } } })
                    }} className={commonStyles.input} required>
                        <option value={''}>Select TimeSlot</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot._id} value={timeSlot._id}>
                                {convertToAMPM(timeSlot.startTime)}-
                                {convertToAMPM(timeSlot.endTime)}
                            </option>
                        ))}
                    </select>

                </div>
            </div>

            <div className="md:col-span-5">
                <label htmlFor="full_name">Rest Days</label>
                <div className="flex space-x-2">
                    <RestDays
                        handleInputChange={handleInputChange}
                        value={restDaysValue}
                    />
                </div>
            </div>
            <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                    {showButton ? <button type='submit' className={commonStyles.btnDark}>
                        Next
                    </button> : ""}
                </div>
            </div>
        </form>
    )
}

export default OrganizationInfo
