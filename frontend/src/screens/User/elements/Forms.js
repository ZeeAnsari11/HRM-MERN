import React, { useEffect } from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'
import Configuration from './Configuration'
import { createUser } from '../../../api/user'
import { useSelector } from 'react-redux'
import { selectCurrentUserBranch, selectOrgId } from '../../../states/reducers/slices/backend/UserSlice'
import UserInfo from './UserInfo'

const Forms = ({ formNumber, changePageNumber, formData, handleInputChange }) => {
    const organization = useSelector(selectOrgId);
    const branch = useSelector(selectCurrentUserBranch);

    useEffect(() => {
        handleInputChange({ target: { name: 'organization', value: organization } });
        handleInputChange({ target: { name: 'branch', value: branch } });
    }, [])
    const handleSubmit = () => {
        let element = {
            timeSlots: formData.timeSlots ? formData.timeSlots.timeSlots : [],
            restDays: formData.roaster ? formData.roaster.restDays : [],
        };
        formData.userRoster = element
        // delete formData.roaster
        // delete formData.timeSlots
        formData.nic.expiry = formData.expiry
        formData.nic.attachment.front = "front.png"
        formData.nic.attachment.back = "back.png"
        console.log("FormData: ", formData);
        createUser(formData);
    }
    if (formNumber === 1)
        return <PersonalInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 2)
        return <UserInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true}/>
    if (formNumber === 3)
        return <OrganizationInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 4)
        return <Configuration formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 5)
        return <>
            <PersonalInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {false}/>
            <UserInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false}/>
            <OrganizationInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} />
            <Configuration formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} />
            <button onClick={handleSubmit}>Submit</button>
        </>
}


export default Forms
