import React, { useEffect } from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'
import Configuration from './Configuration'
import { createUser } from '../../../api/user'
import { useSelector } from 'react-redux'
import { selectCurrentUserBranch, selectOrgId } from '../../../states/reducers/slices/backend/UserSlice'

const Forms = ({ formNumber, changePageNumber }) => {
    const [formData, setFormData] = React.useState({});
    const organization = useSelector(selectOrgId);
    const branch = useSelector(selectCurrentUserBranch);

    const handleInputChange = ({ target: { name, value } }) => {
        console.log("formData.userRoster", formData.userRoster);
        setFormData(formData => ({ ...formData, [name]: value }));
    };

    useEffect(() => {
        handleInputChange({ target: { name: 'organization', value: organization } });
        handleInputChange({ target: { name: 'branch', value: branch } });
    }, [])
    const handleSubmit = () => {
        
        formData.userRoster.timeSlots = formData.timeSlots.timeSlots
        formData.nic.expiry = formData.expiry
        formData.nic.attachment.front = "front"
        formData.nic.attachment.back = "back"
        createUser(formData);
    }
    if (formNumber === 1)
        return <PersonalInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {true}/>
    if (formNumber === 2)
        return <OrganizationInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {true}/> 
    if (formNumber === 3)
        return <Configuration formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {true}/>
    if (formNumber === 4)
        return <>
                <PersonalInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {false}/>
                <OrganizationInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {false}/>
                <Configuration formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {false}/>
                 <button onClick={handleSubmit}>Submit</button>
         </>
}


export default Forms
