import { faEnvelope, faMailBulk, faPencil, faPhoneSquare } from '@fortawesome/free-solid-svg-icons'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'
import React from 'react'
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { updateUserById } from '../../../api/user'
import { useSelector } from 'react-redux'

const ContactInfo = ({ data }) => {
    const title = "Contact Info"
    const userId = useSelector(selectUID);
    
    const [formData, setFormData] = React.useState({
        personalEmail: data.personalEmail,
        phoneNumber: data.phoneNumber,
    });
    const [validationErrors, setValidationErrors] = React.useState({
        personalEmail: '',
        phoneNumber: ''
      });

    // const handleInputChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };
  
    const handleSubmit = (trigger) => {
        const newValidationErrors = {};
        if (formData.personalEmail == '' ||formData.personalEmail == undefined) {
          newValidationErrors.personalEmail = "Personal Email is required.";
        }
        if (formData.phoneNumber == '' ||formData.personalEmail == undefined) {
          newValidationErrors.phoneNumber = "Phone Number is required.";
        }
    
        if (Object.keys(newValidationErrors).length > 0) {
          // Set validation errors and prevent closing the modal
          setValidationErrors(newValidationErrors);
          trigger();
          return;
        }
        updateUserById(userId, formData, trigger);
    }

    const config = [
        {
            label: 'Personal Email',
            type: 'email',
            name: 'personalEmail',
            value: formData.personalEmail,
            onChange: handleInputChange,
            isRequired: true,
            error: {
                status: false,
                message: validationErrors.personalEmail
            }
        },
        {
            label: 'Phone Number',
            type: 'Integer',
            name: 'phoneNumber',
            value: formData.phoneNumber,
            onChange: handleInputChange,
            isRequired: true,
            error: {
                status: false,
                message: validationErrors.phoneNumber
            }
        },
    ]
    const btnConfig = [{
        title: 'Update',
        handler: handleSubmit,
    }]
    return (
        <>
        <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6 pr-4">
                <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
                <Modal
                    action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
                    title={title}
                    Element={<CUForm config={config} handleInputChange={handleInputChange} isFull={false} validationErrors={validationErrors}/>}
                    btnConfig={btnConfig}
                    validationErrors={validationErrors}
                    check={(closeModal) => {
                      if (!validationErrors?.personalEmail && !validationErrors?.phoneNumber && formData?.phoneNumber && formData?.personalEmail) {
                        closeModal()
                      }
                    }}
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
