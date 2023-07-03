import React, { useEffect } from 'react'
import { loadAllOrganizationsInfo } from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserBranch, selectCurrentUserOrg, selectFinalAuthority, selectTimeSlots } from '../../../states/reducers/slices/backend/UserSlice';
import { selectUserDepartment } from '../../../states/reducers/slices/backend/Department';
import { selectUserDesignation } from '../../../states/reducers/slices/backend/Designation';
import SelectForm from '../../../components/SelectForm';
import RestDays from './RestDays';
import { selectEmploymentTypes } from '../../../states/reducers/slices/backend/EmploymentType';

const OrganizationInfo = ({ changePageNumber, handleInputChange }) => {
    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    const branchId = useSelector(selectCurrentUserBranch);
    const departments = useSelector(selectUserDepartment);
    const designations = useSelector(selectUserDesignation);
    const lineManager = useSelector(selectFinalAuthority);
    const timeSlots = useSelector(selectTimeSlots);
    const employmentTypes = useSelector(selectEmploymentTypes)
    console.log("employmentTypes",employmentTypes);

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

    console.log("Line Manager ", lineManager);

    const convertDatetoLocalTime = (date) => {
        const dateTime = new Date(date);
        return dateTime.toLocaleTimeString('en-US', { hour12: true });
    }
    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Department</label>
                <div className="flex space-x-2">
                    <select name='department' onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
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
                    <select name='designation' onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
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
                    <select name='employmentType' onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
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
                    <select name='employeeType' onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
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
                { (lineManager.length > 0) &&  <SelectForm name='lineManager' title={'Line Manager'} people={lineManager} handleInputChange={handleInputChange}/> }
            </div>
            <div className="md:col-span-5">
                <label htmlFor="timeSlots">Roster</label>
                <div className="flex space-x-2">
                    <select name='timeSlots' onChange={(event) => {
                        let val = event.target.value
                        handleInputChange({target: {name: 'timeSlots', value: {timeSlots:val}}})
                    }} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select TimeSlot</option>
                       {
                            timeSlots.map((timeSlot) => {
                                return <option key={timeSlot._id} value={timeSlot._id}>{convertDatetoLocalTime(timeSlot.startTime)}-{convertDatetoLocalTime(timeSlot.endTime)}</option>
                            })
                       }
                    </select>
                </div>
            </div>
            
            <div className="md:col-span-5">
                <label htmlFor="full_name">Rest Days</label>
                <div className="flex space-x-2">
                    <RestDays handleInputChange={handleInputChange}/>
                </div>
            </div>
            <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
            </div>
        </form>
    )
}

export default OrganizationInfo
