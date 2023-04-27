import React, { useEffect } from 'react'
import { loadAllOrganizationsInfo } from '../../../api/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUserOrg } from '../../../states/reducers/slices/backend/UserSlice';

const OrganizationInfo = ({ changePageNumber, handleInputChange }) => {
    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    useEffect(() => {
        loadAllOrganizationsInfo(dispatcher, userOrgId);
    }, [])
    //const orgData = useSelector();
    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="full_name">Branch</label>
                    <div className="flex space-x-2">
                        <select onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                            <option value={''}>Select Branch</option>
                            <option value={'1'}>Option 2</option>
                            <option value={'2'}>Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Department</label>
                <div className="flex space-x-2">
                    <select onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Department</option>
                        <option value={'1'}>Option 2</option>
                        <option value={'2'}>Option 3</option>
                    </select>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Designation</label>
                <div className="flex space-x-2">
                    <select onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Designation</option>
                        <option value={'1'}>Option 2</option>
                        <option value={'2'}>Option 3</option>
                    </select>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Line Manager</label>
                <div className="flex space-x-2">
                    <select onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Line Manager</option>
                        <option value={'1'}>Option 2</option>
                        <option value={'2'}>Option 3</option>
                    </select>
                </div>
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Final Authority</label>
                <div className="flex space-x-2">
                    <select onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                        <option value={''}>Select Final Authority</option>
                        <option value={'1'}>Option 2</option>
                        <option value={'2'}>Option 3</option>
                    </select>
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
