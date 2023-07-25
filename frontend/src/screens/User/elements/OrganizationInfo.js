import React, { useEffect } from 'react'
import { loadAllOrganizationsInfo } from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserBranch, selectCurrentUserOrg, selectFinalAuthority, selectTimeSlots } from '../../../states/reducers/slices/backend/UserSlice';
import { selectUserDepartment } from '../../../states/reducers/slices/backend/Department';
import { selectOrganizationDesignation } from '../../../states/reducers/slices/backend/Designation';
import SelectForm from '../../../components/SelectForm';
import RestDays from './RestDays';
import { selectEmploymentTypes } from '../../../states/reducers/slices/backend/EmploymentType';

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
    console.log("employmentTypes", employmentTypes);

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
        const formattedTime = new Date();
        formattedTime.setHours(hours, minutes);
        return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
    }
    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Department</label>
                <div className="flex space-x-2">
                    <select name='department' id="department" value={formData.department} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
                        <option value={''}>Select Department</option>
                        {
                            departments.map((department) => {
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        }
                    </select>
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
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employment Type</label>
                <div className="flex space-x-2">
                    <select name='employmentType'  id="employmentType" value={formData.employmentType} onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Employment Type</option>
                        {
                            employmentTypes.map((employmentType) => {
                                return <option key={employmentType._id} value={employmentType._id}>{employmentType.employmentType}</option>
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employee Type</label>
                <div className="flex space-x-2">
                    <select name='employeeType'  id="employeeType" value={formData.employeeType}  onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
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
                    }} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
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
                        value={restDaysValue} // Set value to formData.restDays
                    />
                </div>
            </div>
            <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                    {showButton ? <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Next
                    </button> : ""}
                </div>
            </div>
        </form>
    )
}

export default OrganizationInfo
