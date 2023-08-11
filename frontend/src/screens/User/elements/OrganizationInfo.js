import React, { useEffect } from 'react'
import { selectCurrentUserBranch, selectCurrentUserOrg, selectFinalAuthority, selectTimeSlots } from '../../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import RestDays from './RestDays';
import SelectForm from '../../../components/SelectForm';
import { commonStyles } from '../../../styles/common';
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



    const [errors, setErrors] = React.useState({
        department: false,
        designation: false,
        employmentType: false,
        employeeType: false,
        lineManager: false,
        timeSlots: false,
        restDays: false,
    });

    const validator = () => {
        const newErrors = { ...errors };
        let hasErrors = false;

        for (const field in newErrors) {
            if (!formData[field]) {
                console.log("field", formData[field])
                newErrors[field] = true;
                hasErrors = true;
                if (field === 'restDays' && formData?.roaster?.restDays?.length > 0) {
                    newErrors[field] = false;
                }
            } else {
                newErrors[field] = false;
            }
        }
        setErrors(newErrors);
        return hasErrors;
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log();
        if (!validator()) {
            changePageNumber();
        }
    };

    const handleInputChangeWithValidation = (e) => {
        validator();
        handleInputChange(e);
    };

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
        <form className="lg:col-span-2 space-y-4" onSubmit={handleFormSubmit}>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Department</label>
                <div className="flex space-x-2">
                    <select name='department' id="department" value={formData.department} className={
                        errors.department
                            ? `${commonStyles.input} border-red-500`
                            : commonStyles.input
                    } onChange={handleInputChangeWithValidation}>
                        <option value={''}>Select Department</option>
                        {
                            departments.map((department) => {
                                return <option key={department._id} value={department._id}>{department.name}</option>
                            })
                        }
                    </select>
                </div>
                {errors.department && (
                    <span className="text-red-500">Please select a department.</span>
                )}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Designation</label>
                <div className="flex space-x-2">
                    <select name='designation' id="designation" value={formData.designation} onChange={handleInputChangeWithValidation} className={
                        errors.designation
                            ? `${commonStyles.input} border-red-500`
                            : commonStyles.input
                    }>
                        <option value={''}>Select Designation</option>
                        {
                            designations.map((designation) => {
                                return <option key={designation._id} value={designation._id}>{designation.title}</option>
                            })
                        }
                    </select>
                </div>
                {errors.designation && (
                    <span className="text-red-500">Please select a designation.</span>
                )}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employment Type</label>
                <div className="flex space-x-2">
                    <select name='employmentType' id="employmentType" value={formData.employmentType} onChange={handleInputChangeWithValidation} className={
                        errors.employmentType
                            ? `${commonStyles.input} border-red-500`
                            : commonStyles.input
                    } >
                        <option value={''}>Select Employment Type</option>
                        {
                            employmentTypes.map((employmentType) => {
                                return <option key={employmentType._id} value={employmentType._id}>{employmentType.employmentType}</option>
                            })
                        }
                    </select>
                </div>
                {errors.employmentType && (
                    <span className="text-red-500">Please Select Employment Type.</span>
                )}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="full_name">Employee Type</label>
                <div className="flex space-x-2">
                    <select
                        name='employeeType'
                        id="employeeType"
                        value={formData.employeeType}
                        onChange={handleInputChangeWithValidation}
                        className={
                            errors.employeeType
                                ? `${commonStyles.input} border-red-500`
                                : commonStyles.input
                        }
                    >
                        <option value={''}>Select Employee Type</option>
                        {
                            employeeTypes.map((employeeType) => {
                                return <option key={employeeType.name} value={employeeType.name}>{employeeType.name}</option>
                            })
                        }
                    </select>
                </div>
                {errors.employeeType && (
                    <span className="text-red-500">Please select an Employee Type.</span>
                )}
            </div>
            <div className="md:col-span-5">
                <p>Line Manager</p>
                {(lineManager.length > 0) && <SelectForm className={
                    errors.lineManager
                        ? `${commonStyles.input} border-red-500`
                        : commonStyles.input
                } name='lineManager' title={'Line Manager'} people={lineManager} handleInputChange={handleInputChangeWithValidation} value={formData.lineManager} />}
                {errors.lineManager && (
                    <span className="text-red-500">Please select Line Manager.</span>
                )}
            </div>
            <div className="md:col-span-5">
                <label htmlFor="timeSlots">Roster</label>
                <div className="flex space-x-2">
                    <select name='timeSlots' value={timeSlotValue} onChange={(event) => {
                        let val = event.target.value
                        handleInputChangeWithValidation({ target: { name: 'timeSlots', value: { timeSlots: val } } })
                    }} className={
                        errors.timeSlots
                            ? `${commonStyles.input} border-red-500`
                            : commonStyles.input
                    }>
                        <option value={''}>Select TimeSlot</option>
                        {timeSlots.map((timeSlot) => (
                            <option key={timeSlot._id} value={timeSlot._id}>
                                {convertToAMPM(timeSlot.startTime)}-
                                {convertToAMPM(timeSlot.endTime)}
                            </option>
                        ))}
                    </select>
                </div>
                {errors.timeSlots && (
                    <span className="text-red-500">Please select Time Slots.</span>
                )}
            </div>

            <div className="md:col-span-5">
                <label htmlFor="full_name">Rest Days</label>
                <div className="flex space-x-2">
                    <RestDays
                        handleInputChange={handleInputChangeWithValidation}
                        value={restDaysValue}
                        className={
                            errors.restDays
                                ? `${commonStyles.input} border-red-500`
                                : commonStyles.input
                        }
                    />
                    {errors.restDays && (
                        <span className="text-red-500">Please select Rest Days.</span>
                    )}
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
