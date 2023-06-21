import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadAllOrganizationsInfo } from '../../../api/user';
import { selectCurrentUserBranch, selectCurrentUserOrg, selectUserGrades } from '../../../states/reducers/slices/backend/UserSlice';

const UserInfo = ({ changePageNumber, handleInputChange }) => {

    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    const branchId = useSelector(selectCurrentUserBranch);
    const grades = useSelector(selectUserGrades)

    console.log("grades", grades);

    useEffect(() => {
        loadAllOrganizationsInfo(dispatcher, userOrgId, branchId);
    }, []);

    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                    <label className='pl-2' htmlFor="gender">Enter Role Type</label>
                    <select
                        name="roleType"
                        id="roleType"
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                    >
                        <option value=''>Select Role Type</option>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>
                        <option value='manager'>Manager</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="full_name">Grades</label>
                    <div className="flex space-x-2">
                        <select name='grade' onChange={handleInputChange} className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required>
                            <option value={''}>Select Grade</option>
                            {
                                grades.map((grade) => {
                                    return <option key={grade._id} value={grade._id}>{grade.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="md:col-span-3">
                    <label className='pl-2' htmlFor="cnic">Driving License</label>
                    <div className="flex space-x-2">
                        <input
                            type="int"
                            name="drivingLiscence"
                            id="drivingLiscence"
                            placeholder="3510319187449"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={
                                (event) => {
                                    handleInputChange({ target: { name: 'drivingLiscence', value: { number: event.target.value } } })
                                }
                            }
                            required
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="gross Salary">Gross Salary</label>
                    <div className="flex space-x-2">
                        <input
                            type="int"
                            name="grossSalary"
                            id="grossSalary"
                            placeholder="100000000000"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label className='pl-2' htmlFor="cnic">Passport</label>
                    <div className="flex space-x-2">
                        <input
                            type="int"
                            name="passport"
                            id="passport"
                            placeholder="3510319187449"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={
                                (event) => {
                                    handleInputChange({ target: { name: 'passport', value: { number: event.target.value } } })
                                }
                            }
                            required
                        />
                    </div>
                </div>
                <div className="md:col-span-2">
                    <label className='pl-2' htmlFor="cnic">Enter CNIC</label>
                    <div className="flex space-x-2">
                        <input
                            type="int"
                            name="number"
                            id="number"
                            placeholder="3510319187449"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={
                                (event) => {
                                    handleInputChange({ target: { name: 'nic', value: { number: event.target.value, expiry: '', attachment: { front: '', back: '' } } } })
                                }
                            }
                            required
                        />
                    </div>
                </div>
                <div className="md:col-span-5">
                    <div className="mb-3">
                        <label htmlFor="formFileLg" className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                            CNIC Front Attachment
                        </label>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            id="front"
                            type="file"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="md:col-span-5">
                    <div className="mb-3">
                        <label htmlFor="formFileLg" className="mb-2 inline-block text-neutral-700 dark:text-neutral-200">
                            CNIC Back Attachment
                        </label>
                        <input
                            className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                            id="back"
                            type="file"
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label className='pl-2' htmlFor="dob">CNIC expiry date</label>
                    <input
                        type="date"
                        name="expiry"
                        onChange={handleInputChange}
                        id="expiry"
                        required
                        className="transition-all h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className='pl-2' htmlFor="dob">Enter Joining Date</label>
                    <input
                        type="date"
                        name="joiningDate"
                        onChange={handleInputChange}
                        id="joiningDate"
                        required
                        className="transition-all h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>
            </div>

            <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                    <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Next
                    </button>
                </div>
            </div>
        </form >
    )
}

export default UserInfo
