import React, { useEffect } from 'react'
import { selectCurrentUserBranch, selectOrgId } from '../../../states/reducers/slices/backend/UserSlice'

import Configuration from './Configuration'
import Loader from '../../../components/Loader'
import OrganizationInfo from './OrganizationInfo'
import PersonalInfo from './PersonalInfo'
import UserInfo from './UserInfo'
import { commonStyles } from '../../../styles/common'
import { createUser } from '../../../api/user'
import { useSelector } from 'react-redux'

const Forms = ({ formNumber, changePageNumber, formData, handleInputChange }) => {
    const organization = useSelector(selectOrgId);
    const branch = useSelector(selectCurrentUserBranch);
    const [loader, setLoader] = React.useState(false); 
    
    useEffect(() => {
        handleInputChange({ target: { name: 'organization', value: organization } });
        handleInputChange({ target: { name: 'branch', value: branch } });
    }, [])
    
    const handleSubmit = () => {
        setLoader(true)
        let element = {
            timeSlots: formData.timeSlots,
            restDays: formData.roaster.restDays,
        };
        let nic = {
            number: formData.nic.number,
            expiry: formData.expiry,
            attachment: {
                back: "back.png",
                front: "front.png",
            }
        }
        let data = {...formData, "userRoster": element, "nic":nic}
        createUser(data, setLoader);
    }
    if (formNumber === 1)
        return <PersonalInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 2)
        return <UserInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true}/>
    if (formNumber === 3)
        return <OrganizationInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 4)
        return <Configuration disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={true} />
    if (formNumber === 5)
        return <>
            <PersonalInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton = {false}/>
            <UserInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false}/>
            <OrganizationInfo disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} />
            <Configuration disabled={loader} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} />
            <div>
            <button disabled={loader} className={commonStyles.btnDark} onClick={handleSubmit}>Submit {loader && <Loader color={'white'}/>}</button>
            </div>
        </>
}


export default Forms
