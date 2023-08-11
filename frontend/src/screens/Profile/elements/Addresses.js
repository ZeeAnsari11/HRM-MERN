import { faBuilding, faLocation, faPencil } from '@fortawesome/free-solid-svg-icons'

import CUForm from './common/CUForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'
import React from 'react'
import { selectUID } from '../../../states/reducers/slices/backend/UserSlice'
import { updateUserById } from '../../../api/user'
import { useSelector } from 'react-redux'

const Addresses = ({ data }) => {
    const userId = useSelector(selectUID);
    const [formData, setFormData] = React.useState({
        permanentAddress: data.permanentAddress,
        temporaryAddress: data.temporaryAddress,
    });
    const [validationErrors, setValidationErrors] = React.useState({
        permanentAddress: '',
        temporaryAddress: ''
      });

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    
        // Clear validation error when user starts typing again
        setValidationErrors({
          ...validationErrors,
          [name]: "",
        });
      };
      
    const config = [
        {
            label: 'Permamanet Address',
            type: 'text',
            name: 'permanentAddress',
            value: formData.permanentAddress,
            onChange: handleInputChange,
            isRequired: true,
            error: {
                status: false,
                message: validationErrors.permanentAddress
            }
        },
        {
            label: 'Temporary Address',
            type: 'text',
            name: 'temporaryAddress',
            value: formData.temporaryAddress,
            onChange: handleInputChange,
            isRequired: true,
            error: {
                status: false,
                message: validationErrors.temporaryAddress
            }
        },
    ]


    const title = "Addresses Info"
    const handleSubmit = (trigger) => {
        const newValidationErrors = {};
        if (formData.permanentAddress == '' ||formData.permanentAddress == undefined) {
          newValidationErrors.permanentAddress = "Permanent Address is required.";
        }
        if (formData.temporaryAddress == '' ||formData.temporaryAddress == undefined) {
          newValidationErrors.temporaryAddress = "Temporary Address is required.";
        }
    
        if (Object.keys(newValidationErrors).length > 0) {
          // Set validation errors and prevent closing the modal
          setValidationErrors(newValidationErrors);
          trigger();
          return;
        }
        
        updateUserById(userId, formData, trigger);
    }
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
                    <div className="text-lg font-semibold mobile:text-md"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Permanant</div>
                    <p className="px-10">{formData.permanentAddress}</p>
                </span>
                <span className="text-gray-600">
                    <div className="text-lg font-semibold"><FontAwesomeIcon icon={faLocation} className="w-8 mr-2" />Temporary</div>
                    <p className="px-10">{formData.temporaryAddress}</p>
                </span>
            </div>
        </>
    )
}

export default Addresses


