import { faEnvelope, faMailBulk, faPhoneSquare, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from '../../../components/Modal'

const ContactInfo = ({ data }) => {
    const title = "Contact Info"
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
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />Official Email</div>
                <p className="px-10">{data.email}</p>
            </span>
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faEnvelope} className="w-8 mr-2" />Personal Email</div>
                <p className="px-10">{data.personalEmail}</p>
            </span>
            <span className="text-gray-600">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faPhoneSquare} className="w-8 mr-2" />Contact No.</div>
                <p className="px-10">{data.phoneNumber ? data.phoneNumber : 'Contact Number Empty'}</p>
            </span>
        </div>
        </>

    )
}

export default ContactInfo
