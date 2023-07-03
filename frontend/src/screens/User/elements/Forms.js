import React, { useEffect } from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'
import Configuration from './Configuration'
import { createUser } from '../../../api/user'
import { useSelector } from 'react-redux'
import { selectCurrentUserBranch, selectOrgId } from '../../../states/reducers/slices/backend/UserSlice'
import UserInfo from './UserInfo'

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
        return <PersonalInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange} />
    if (formNumber === 2)
        return <UserInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange} />
    if (formNumber === 3)
        return <OrganizationInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange} />
    if (formNumber === 4)
        return <Configuration changePageNumber={changePageNumber} handleInputChange={handleInputChange} />
    if (formNumber === 5)
        return <div className='py-40'>
            <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>

}



export default Forms
