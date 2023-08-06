import { faDriversLicense, faIdCard, faPassport, faPencil } from '@fortawesome/free-solid-svg-icons'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'
import React from 'react'
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { updateUserById } from '../../../api/user'
import { useSelector } from 'react-redux'

const PersonalInfo = ({ data }) => {
    const userId = useSelector(selectUID);
    const [formData, setFormData] = React.useState({
        nic: {number: data?.nic?.number,
            attachment : {
                back: 'x',
                front : 'x'
            },
            expiry:'2025-11-12T00:00:00.000Z'
        },
        passport: {number: data?.passport?.number},
        drivingLiscence: {number: data?.drivingLiscence?.number}
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: {
            ...prevFormData[name],
            number: value,
          },
        }));
      };

    const title = "Personal Info"
    
    const handleSubmit = (trigger) => {
        updateUserById(userId, formData, trigger);
    }
    const btnConfig = [{
        title: 'Update',
        handler: handleSubmit,
    }]
    const config = [
        {
            label: 'CNIC/ Id Card',
            type: 'number',
            name: 'nic',
            value: formData.nic?.number,
            onChange: handleInputChange,
            isRequired: true
        },
        {
            label: 'Passport Number',
            type: 'number',
            name: 'passport',
            value: formData.passport?.number,
            onChange: handleInputChange,
            isRequired: true
        },
        {
            label: 'Driving License Number',
            type: 'number',
            name: 'drivingLiscence',
            value:  formData.drivingLiscence?.number,
            onChange: handleInputChange,
            isRequired: true
        }
    ]
    return (
        <>
            <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6 pr-4">
                <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={<CUForm config={config} handleInputChange={handleInputChange} isFull={false} />}
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
