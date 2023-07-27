import Configuration from '../User/elements/Configuration'
import OrganizationInfo from '../User/elements/OrganizationInfo'
import PersonalInfo from '../../screens/User/elements/PersonalInfo'
import React from 'react'
import UserInfo from '../User/elements/UserInfo'

const EmployeeEditForm = ({ formData, handleInputChange }) => {

    return (
        <>
            <PersonalInfo formData={formData}  handleInputChange={handleInputChange} showButton={false} />
            <UserInfo formData={formData}  handleInputChange={handleInputChange} showButton={false} />
            <OrganizationInfo formData={formData}  handleInputChange={handleInputChange} showButton={false} />
            <Configuration formData={formData}  handleInputChange={handleInputChange} showButton={false} />
        </>
    )
}

export default EmployeeEditForm
