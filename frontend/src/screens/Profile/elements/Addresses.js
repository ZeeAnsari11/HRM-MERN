import { faBuilding, faLocation, faPencil } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Modal from '../../../components/Modal'

const Addresses = ({ data }) => {
    const title = "Addresses Info"
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
                    <div className="text-lg font-semibold"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Permanant</div>
                    <p className="px-10">34 N Franklin Ave Ste 687 #2146 Pinedale, Wyoming 82941, United States</p>
                </span>
                <span className="text-gray-600">
                    <div className="text-lg font-semibold"><FontAwesomeIcon icon={faLocation} className="w-8 mr-2" />Temporary</div>
                    <p className="px-10">654 street avenue, Wyoming 82941, United States</p>
                </span>
            </div>
        </>
    )
}

export default Addresses
