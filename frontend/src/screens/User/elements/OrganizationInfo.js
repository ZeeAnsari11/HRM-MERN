import React, { useEffect } from 'react'
import { loadAllOrganizationsInfo } from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserBranch, selectCurrentUserOrg, selectFinalAuthority, selectTimeSlots } from '../../../states/reducers/slices/backend/UserSlice';
import { selectUserBranch } from '../../../states/reducers/slices/backend/Branch';
import { selectUserDepartment } from '../../../states/reducers/slices/backend/Department';
import { selectOrganizationDesignation } from '../../../states/reducers/slices/backend/Designation';
import SelectForm from '../../../components/SelectForm';
import RestDays from './RestDays';

const OrganizationInfo = ({ formData, changePageNumber, handleInputChange, showButton }) => {
    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    const branchId = useSelector(selectCurrentUserBranch);
    const branches = useSelector(selectUserBranch);
    const departments = useSelector(selectUserDepartment);
    const designations = useSelector(selectOrganizationDesignation);
    const lineManager = useSelector(selectFinalAuthority);
    const timeSlots = useSelector(selectTimeSlots);

    const timeSlotValue = formData.roaster ? formData.roaster.timeSlot : '';
    const restDaysValue = formData.roaster && formData.roaster.restDays ? formData.roaster.restDays : [];

    useEffect(() => {
        loadAllOrganizationsInfo(dispatcher, userOrgId, branchId);
    }, []);

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
                <p>Line Manager</p>
                {(lineManager.length > 0) && <SelectForm name='lineManager' title={'Line Manager'} people={lineManager} handleInputChange={handleInputChange} value={formData.lineManager} />}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Roaster</label>
                <div className="flex space-x-2">
                    <select
                        name="timeSlot"
                        id="timeSlot"
                        value={timeSlotValue} // Set value to formData.roaster.timeSlot
                        onChange={(event) => {
                            let val = event.target.value;
                            handleInputChange({
                                target: { name: 'roaster', value: { timeSlot: val } },
                            });
                        }}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                    >
                        <option value={''}>Select TimeSlot</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot._id} value={timeSlot._id}>
                                {convertDatetoLocalTime(timeSlot.startTime)}-
                                {convertDatetoLocalTime(timeSlot.endTime)}
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
