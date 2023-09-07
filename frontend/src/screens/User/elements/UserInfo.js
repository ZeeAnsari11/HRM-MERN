import React, { useEffect, useState } from 'react'
import { selectCurrentUserBranch, selectCurrentUserOrg, selectUserGrades } from '../../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import { commonStyles } from '../../../styles/common';
import { loadAllOrganizationsInfo } from '../../../api/user';

const UserInfo = ({ disabled, formData, changePageNumber, handleInputChange, showButton,trigger }) => {
    const [errors, setErrors] = React.useState({
        roleType: false,
        grossSalary: false,
        expiry: false,
        joiningDate: false,
    });

    const [numError , setNumError] = React.useState({
        drivingLiscenceNumber: false,
        passportNumber: false,
        nicNumber: false,
    })
    
    const validator = () => {
        let newErrors = { ...errors };
        let numbersError = {}
        let hasErrors = false;

        for (const field in newErrors) {
            if ( !formData[field]) {
                newErrors[field] = true;
                hasErrors = true;
                trigger = true
            }
            if(!formData?.drivingLiscence?.number){
                numbersError.drivingLiscenceNumber = true;
                 hasErrors = true;
                 trigger = true
            }
            if(!formData?.passport?.number){
                numbersError.passportNumber = true;
                 hasErrors = true;
                 trigger = true
            }
            if(!formData?.nic?.number){
                numbersError.nicNumber = true;
                 hasErrors = true;
                 trigger = true
            }  
        }
        setNumError(numbersError)
        setErrors(newErrors);
        return hasErrors;
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!validator()) {
            changePageNumber();
        }
    };

    const handler = (e) => {
        handleInputChange(e);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: e.target.value ? false : true,
        }));
    };

    const dispatcher = useDispatch();
    const userOrgId = useSelector(selectCurrentUserOrg);
    const branchId = useSelector(selectCurrentUserBranch);
    const grades = useSelector(selectUserGrades)
    const [setFrontFile] = useState(null);
    const [setBackFile] = useState(null);

    useEffect(() => {
        loadAllOrganizationsInfo(dispatcher, userOrgId, branchId);
    });

    const handleFrontFileChange = (event) => {
        const file = event.target.files[0];
        setFrontFile(file);
        handleInputChange({ target: { name: 'frontSide', value: file } });
    };

    const handleBackFileChange = (event) => {
        const file = event.target.files[0];
        setBackFile(file);
        handleInputChange({ target: { name: 'backSide', value: file } });
    };

    return (
        <form className="lg:col-span-2 space-y-4" onSubmit={handleFormSubmit}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                    <label htmlFor="gender">Enter Role Type</label>
                    <select
                        name="roleType"
                        id="roleType"
                        disabled={disabled}
                        value={formData.roleType}
                        onChange={handler}
                        className={errors.roleType ? `${commonStyles.input} border-red-500` : commonStyles.input}
                    >
                        <option value="">Select Role Type</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                    </select>
                    {errors.roleType && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="full_name">Grades</label>
                    <div className="flex space-x-2">
                        <select name="grade" value={formData.grade} disabled={disabled} onChange={handler} className={commonStyles.input}>
                            <option value="">Select Grade</option>
                            {grades.map((grade) => {
                                return <option key={grade._id} value={grade._id}>{grade.name}</option>
                            })}
                        </select>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="drivingLiscence">Driving License</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="drivingLiscence"
                            disabled={disabled}
                            id="drivingLiscence"
                            pattern="[0-9]*"
                            value={formData?.drivingLiscence?.number}
                            placeholder="3510319187449"
                            className={numError.drivingLiscenceNumber ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={(event) => {
                                handleInputChange({ target: { name: 'drivingLiscence', value: { number: event.target.value } } });
                                setNumError((prevErrors) => ({
                                    ...prevErrors,
                                    "drivingLiscenceNumber": event.target.value ? false : true,
                                }));
                            }}
                        />
                    </div>
                    {numError?.drivingLiscenceNumber && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="grossSalary">Gross Salary</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="grossSalary"
                            id="grossSalary"
                            disabled={disabled}
                            value={formData.grossSalary}
                            placeholder="100000000000"
                            className={errors.grossSalary ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={handler}

                        />
                    </div>
                    {errors.grossSalary && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="passport">Passport</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            disabled={disabled}
                            name="passport"
                            id="passport"
                            value={formData.passport?.number}
                            placeholder="3510319187449"
                            className={numError?.passportNumber ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={(event) => {
                                setNumError((prevErrors) => ({
                                    ...prevErrors,
                                    "passportNumber": event.target.value ? false : true,
                                }));
                                handleInputChange({ target: { name: 'passport', value: { number: event.target.value } } });
                            }}

                        />
                    </div>
                    {numError?.passportNumber && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="number">Enter CNIC</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            name="number"
                            id="number"
                            pattern="[0-9]*"
                            disabled={disabled}
                            value={formData.nic?.number}
                            placeholder="3510319187449"
                            className={numError?.nicNumber ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={(event) => {
                                setNumError((prevErrors) => ({
                                    ...prevErrors,
                                    "nicNumber": event.target.value ? false : true,
                                }));
                                handleInputChange({ target: { name: 'nic', value: { number: event.target.value, expiry: '', attachment: { front: '', back: '' } } } });
                            }}
                        />
                    </div>
                    {numError?.nicNumber && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-5">
                    <div className="mb-3">
                        <label htmlFor="formFileLg" className="mb-2 inline-block text-neutral-700">
                            CNIC Front Attachment
                        </label>
                        <input
                            className={`relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none ${errors.front ? 'border-red-500' : ''}`}
                            id="front"
                            type="file"
                            disabled={disabled}
                            onChange={handleFrontFileChange}
                        />
                    </div>
                    {errors.front && <span className="text-red-500">Please upload the front attachment.</span>}
                </div>

                <div className="md:col-span-5">
                    <div className="mb-3">
                        <label htmlFor="formFileLg" className="mb-2 inline-block text-neutral-700">
                            CNIC Back Attachment
                        </label>
                        <input
                            className={`relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none ${errors.back ? 'border-red-500' : ''
                                }`}
                            id="back"
                            type="file"
                            disabled={disabled}
                            onChange={handleBackFileChange}
                        />
                    </div>
                    {errors.back && <span className="text-red-500">Please upload the back attachment.</span>}
                </div>

                <div className="md:col-span-3">
                    <label htmlFor="dob">CNIC expiry date</label>
                    <input
                        type="date"
                        name="expiry"
                        pattern="[0-9]*"
                        disabled={disabled}
                        value={formData.expiry}
                        onChange={handler}
                        id="expiry"
                        className={errors.expiry ? `${commonStyles.input} border-red-500` : commonStyles.input}
                    />
                    {errors.expiry && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                <div className="md:col-span-2">
                    <label htmlFor="dob">Enter Joining Date</label>
                    <input
                        type="date"
                        name="joiningDate"
                        value={formData.joiningDate}
                        onChange={handler}
                        disabled={disabled}
                        id="joiningDate"
                        className={errors.joiningDate ? `${commonStyles.input} border-red-500` : commonStyles.input}
                    />
                    {errors.joiningDate && <span className="text-red-500">Please fill out this field.</span>}
                </div>
            </div>

            <div className="md:col-span-5 text-right">
                <div className="inline-flex items-end">
                    {showButton ? (
                        <button type="submit" disabled={disabled} className={commonStyles.btnDark}>
                            Next
                        </button>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </form>
    );

}

export default UserInfo
