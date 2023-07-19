import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDriversLicense, faIdCard, faPassport, faPencil } from '@fortawesome/free-solid-svg-icons'
import Modal from '../../../components/Modal'

const PersonalInfo = ({ data }) => {
    const title = "Personal Info"
    const handleSubmit = (triiger) => {
        console.log("Clicked Address")
        triiger();
    }
    const btnConfig = [{
        title: 'Create',
        handler: handleSubmit,
    }]
    return (
        <>
        <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg">
                <h1 className="px-4 text-2xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={<h1>Hello</h1>}
                    btnConfig={btnConfig}
                />
            </div>
        <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faIdCard} className="w-8 mr-2" />ID Card</div>
                <p className="px-10">{data?.nic?.number}</p>
            </span>
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faPassport} className="w-8 mr-2" />Passport</div>
                <p className="px-10">{data?.passport?.number}</p>
            </span>
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faDriversLicense} className="w-8 mr-2" />Driving Lisence</div>
                <p className="px-10">{data?.drivingLiscence?.number}</p>
            </span>
        </div>
        </>
    )
}

export default PersonalInfo
