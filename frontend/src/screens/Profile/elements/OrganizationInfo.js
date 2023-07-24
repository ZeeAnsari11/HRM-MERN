import { faBuilding, faIdBadge, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from '../../../components/Modal'

const OrganizationInfo = ({data}) => {
    const title = "Organization Info"
    const handleSubmit = (triiger) => {
        console.log("Clicked")
        triiger();
    }
    const btnConfig = [{
        title: 'Create',
        handler: handleSubmit,
    }]
    return (
        <>
        <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6">
            <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>            
        </div>
        
        <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faIdBadge} className="w-8 mr-2" />User ID</div>
                <p className="px-10">{data.organization.userCode.prefix}-{data.userDefinedCode}</p>
            </span>
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Branch</div>
                <p className="px-10">{data.branch.name} in {data.branch.city}</p>
            </span>
        </div>
        </>
    )
}

export default OrganizationInfo