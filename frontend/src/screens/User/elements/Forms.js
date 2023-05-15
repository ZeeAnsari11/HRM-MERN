import React, { useEffect } from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'
import Configuration from './Configuration'
import { createUser } from '../../../api/user'
import { useSelector } from 'react-redux'
import { selectCurrentUserBranch, selectOrgId } from '../../../states/reducers/slices/backend/UserSlice'

const Forms = ({formNumber, changePageNumber}) => {
    const [formData, setFormData] = React.useState({});
    const organization = useSelector(selectOrgId);
    const branch = useSelector(selectCurrentUserBranch);

    const handleInputChange = ({target: {name, value}}) => {
        setFormData(formData => ({...formData, [name]: value}));
    };
    
      useEffect(() => {
        handleInputChange({target: {name:'organization', value:organization}});
        handleInputChange({target: {name:'branch', value:branch}});
    }, [])
    const handleSubmit = () => {
        createUser(formData);
    }
    if (formNumber === 1)
        return <PersonalInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange}/>
    if (formNumber === 2)
        return <OrganizationInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange}/> 
    if (formNumber === 3)
        return <Configuration changePageNumber={changePageNumber} handleInputChange={handleInputChange}/>
    if (formNumber === 4)
        return <button onClick={handleSubmit}>Submit</button>
}

export default Forms
