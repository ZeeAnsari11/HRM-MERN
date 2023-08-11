import React, { useEffect, useState } from 'react'
import { createExperience, deleteExperience, getExperiences, resetStates, updateExperience } from '../../../api/experiences'
import { faMailBulk, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { selectExperiencesClickState, selectSelectedExperience, selectUserExperiences, setClickState } from '../../../states/reducers/slices/backend/Experiences'
import { useDispatch, useSelector } from 'react-redux'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'

const ExperiencesBlock = ({ item }) => {
  const dispatcher = useDispatch();
  const [hoverState, setHoverState] = useState(false);
  const selectState = useSelector(selectExperiencesClickState);
  return <div className="flex flex-col space-y-4 relative" onMouseLeave={() => setHoverState(false)} onMouseEnter={() => setHoverState(true)}>
    <span className={`${(selectState === item._id) ? 'bg-primaryColorLight text-white' : 'bg-gray-300'} text-gray-600 cursor-pointer hover:bg-gray-400 hover:shadow-sm rounded-md p-4`}>
      <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.organization}</div>
      <div className='flex justify-between items-center'>
        <p>{item?.designation}</p>
        <p>{item?.stack}</p>
      </div>
    </span>
    <div className={`absolute flex cursor-pointer justify-evenly items-center transition-opacity top-0 !mt-0 rounded-md bg-lightText w-full h-full ${hoverState ? 'opacity-100' : 'opacity-0'}`}>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => deleteExperience(item._id, dispatcher)} icon={faTrash} />
      <div className='w-[2px] h-1/2 bg-gray-500'></div>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => dispatcher(setClickState(item))} icon={faPencil} />
    </div>
  </div>
}

const Experiences = ({ userID }) => {
  const dispatcher = useDispatch();
  const title = "Experiences"
  const allUserExperiences = useSelector(selectUserExperiences);
  const selectedExperience = useSelector(selectSelectedExperience);
  const [formData, setFormData] = useState({
    ...selectedExperience, user: userID
  })
  const [validationErrors, setValidationErrors] = React.useState({
    designation: '',
    organization: '',
    experienceLetter: '',
    stack: '',
    reasonForLeaving : ''

  });

  useEffect(() => {
    getExperiences(userID, dispatcher);
    setFormData({
      ...selectedExperience, user: userID
    })
  }, [selectedExperience])

  const handleSubmit = (trigger) => {
    const newValidationErrors = {};
    if (formData.designation == '' || formData.designation == undefined) {
      newValidationErrors.designation = "Designation is required.";
    }
    if (formData.organization == '' || formData.organization == undefined) {
      newValidationErrors.organization = "Organization Name is required.";
    }
    if (formData.experienceLetter == '' || formData.experienceLetter == undefined) {
      newValidationErrors.experienceLetter = "ExperienceLetter is required.";
    }
    if (formData.stack == '' || formData.stack == undefined) {
      newValidationErrors.stack = "Stack is required.";
    }
    if (formData.reasonForLeaving == '' || formData.reasonForLeaving == undefined) {
      newValidationErrors.reasonForLeaving = "ReasonForLeaving is required.";
    }
    
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }

    if (formData.id === undefined || formData.id === '') {
      createExperience(formData, trigger)
    }
    else {
      let id = formData.id;
      let updateObj = {
        designation: formData.designation,
        organization: formData.organization,
        experienceLetter: formData.experienceLetter,
        stack: formData.stack,
      }
      updateExperience(id, updateObj, dispatcher, trigger);
    }
    setFormData({
      id: '',
      designation: '',
      organization: '',
      experienceLetter: '',
      stack: '',
      reasonForLeaving: ''
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear validation error when user starts typing again
    setValidationErrors({
      ...validationErrors,
      [name]: "",
    });
  };

  const btnConfig = [{
    title: (formData.id === undefined || formData.id === '') ? 'Create' : 'Update',
    handler: handleSubmit,
  }]

  const formDataConfig = [
    {
      label: 'Designation',
      type: 'text',
      name: 'designation',
      value: formData.designation,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.designation
      }
    },
    {
      label: 'Organization',
      type: 'text',
      name: 'organization',
      value: formData.organization,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.organization
      }
    },
    {
      label: 'Experience Letter',
      type: 'text',
      name: 'experienceLetter',
      value: formData.experienceLetter,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.experienceLetter
      }
    },
    {
      label: 'Stack',
      type: 'text',
      name: 'stack',
      value: formData.stack,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.stack
      }
    },
    {
      label: 'Reason For Leaving',
      type: 'text',
      name: 'reasonForLeaving',
      value: formData.reasonForLeaving,
      onChange: handleInputChange,
      isRequired: false,
      error: {
        status: false,
        message: validationErrors.reasonForLeaving
      }
    }
  ]

  return (
    <>
      <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg tablet:pr-6 pr-4">
        <h1 className="px-4 text-2xl mobile:text-xl">{title}</h1>
        <Modal
          action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
          title={title}
          onClose={() => resetStates(dispatcher)}
          Element={
            <>
              <div className='flex justify-between mobile:flex-col mobile:space-y-4'>
              { allUserExperiences.length > 0 &&
                <div className='space-y-4 max-h-[400px] mobile:w-full overflow-auto w-[300px]'>
                  {
                    allUserExperiences?.map((item, index) => {
                      return <ExperiencesBlock item={item} key={index} />
                    })
                  }
              </div>
              }
                <CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={allUserExperiences.length >0 ? true : false} validationErrors={validationErrors}/>
              </div>
            </>
          }
          btnConfig={btnConfig}
          validationErrors={validationErrors}
          check={(closeModal) => {
            if (!validationErrors?.designation && !validationErrors?.organization && !validationErrors?.experienceLetter && !validationErrors?.stack && !validationErrors?.experienceLetter && !validationErrors.reasonForLeaving &&
              formData?.designation && formData?.organization && formData?.experienceLetter && formData?.stack && formData?.experienceLetter && formData?.reasonForLeaving) {
              closeModal()
            }
          }}
        />
      </div>
      <div className='max-h-[250px] overflow-auto'>
        {
          allUserExperiences?.map((item, index) => {
            return <div key={index} className="flex flex-col space-y-4">
              <span className="text-gray-600 p-4">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.organization}</div>
                <div className='flex justify-between items-center px-10'>
                  <p>{item?.designation}</p>
                  <p>{item?.stack}</p>
                </div>
              </span>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Experiences