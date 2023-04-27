import React from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'
import Configuration from './Configuration'

const Forms = ({formNumber, changePageNumber}) => {
    const [formData, setFormData] = React.useState({});
    const handleInputChange = ({target: {name, value}}) => {
        setFormData(formData => ({...formData, [name]: value}));
      };
    if (formNumber === 1)
        return <PersonalInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange}/>
    if (formNumber === 2)
        return <OrganizationInfo changePageNumber={changePageNumber} handleInputChange={handleInputChange}/> 
    if (formNumber === 3)
        return <Configuration changePageNumber={changePageNumber} handleInputChange={handleInputChange}/>
}

export default Forms
