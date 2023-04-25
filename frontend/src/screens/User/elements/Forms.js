import React from 'react'
import PersonalInfo from './PersonalInfo'
import OrganizationInfo from './OrganizationInfo'

const Forms = ({formNumber, changePageNumber}) => {
    if (formNumber === 1)
        return <PersonalInfo changePageNumber={changePageNumber}/>
    if (formNumber === 2)
        return <OrganizationInfo changePageNumber={changePageNumber}/> 
    if (formNumber === 3)
        return <PersonalInfo />
}

export default Forms
