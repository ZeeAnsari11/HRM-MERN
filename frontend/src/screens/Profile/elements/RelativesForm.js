import React, { useEffect, useState } from 'react'
import { createRelative, deleteRelative, getRelatives, resetStates, updateRelative } from '../../../api/relatives'
import { faMailBulk, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { selectRelativeClickState, selectSelectedRelative, selectUserRelative, setClickState } from '../../../states/reducers/slices/backend/RelativesSlice'
import { useDispatch, useSelector } from 'react-redux'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'

const RelativeBlock = ({ item }) => {
  const dispatcher = useDispatch();
  const [hoverState, setHoverState] = useState(false);
  const selectState = useSelector(selectRelativeClickState);
  return <div className="flex flex-col space-y-4 relative" onMouseLeave={() => setHoverState(false)} onMouseEnter={() => setHoverState(true)}>
    <span className={`${(selectState === item._id) ? 'bg-primaryColorLight text-white' : 'bg-gray-300'} text-gray-600 cursor-pointer hover:bg-gray-400 hover:shadow-sm rounded-md p-4`}>
      <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.name}</div>
      <div className='flex justify-between items-center'>
        <p>{item?.cellNumber}</p>
        <p>{item?.relationship}</p>
      </div>
    </span>
    <div className={`absolute flex cursor-pointer justify-evenly items-center transition-opacity top-0 !mt-0 rounded-md bg-lightText w-full h-full ${hoverState ? 'opacity-100' : 'opacity-0'}`}>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => deleteRelative(item._id,dispatcher)} icon={faTrash}/>
      <div className='w-[2px] h-1/2 bg-gray-500'></div>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => dispatcher(setClickState(item))} icon={faPencil}/>
    </div>
  </div>
}

const RelativesForm = ({ userID }) => {
  const dispatcher = useDispatch();
  const title = "Relatives Info"
  const allUserRelatives = useSelector(selectUserRelative);
  const selectedRelative = useSelector(selectSelectedRelative);
  
  const [formData, setFormData] = useState({
    ...selectedRelative, user: userID
  })

  useEffect(() => {
    getRelatives(userID, dispatcher);
    setFormData({
      ...selectedRelative, user: userID
    })
  }, [selectedRelative])

  const [validationErrors, setValidationErrors] = React.useState({
    name : '',
    relationship : '',
    cellNumber : '',
    landLineNumber : '',
  });

  const handleSubmit = (trigger) => {
    const newValidationErrors = {};
        if (formData.name == '' ||formData.name == undefined) {
          newValidationErrors.name = "Name is required.";
        }
        if (formData.relationship == '' ||formData.relationship == undefined) {
          newValidationErrors.relationship = "Relationship is required.";
        }
        if (formData.cellNumber == '' ||formData.cellNumber == undefined) {
          newValidationErrors.cellNumber = "Cell Numberr is required.";
        }
        if (formData.landLineNumber == '' ||formData.landLineNumber == undefined) {
          newValidationErrors.landLineNumber = "landLine Number is required.";
        }
        
        if (Object.keys(newValidationErrors).length > 0) {
          // Set validation errors and prevent closing the modal
          setValidationErrors(newValidationErrors);
          trigger();
          return;
        }
        
    if (formData.id === undefined || formData.id === '') {
      createRelative(formData, trigger)
    }
    else {
      let id = formData.id;
      let updateObj = {
        name: formData.name,
        relationship: formData.relationship,
        cellNumber: formData.cellNumber,
        landLineNumber: formData.landLineNumber,
        isDependent: formData.isDependent
      }
      updateRelative(id, updateObj, dispatcher, trigger);
    }
    setFormData({
      id: '',
      name: '',
      relationship: '',
      cellNumber: '',
      landLineNumber: '',
      isDependent: false
    })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    (type === 'checkbox') ? setFormData({ ...formData, [name]: checked }) : setFormData({ ...formData, [name]: value })
    
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
      label: 'Name',
      type: 'text',
      name: 'name',
      value: formData.name,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.name
    }
    },
    {
      label: 'Relationship',
      type: 'text',
      name: 'relationship',
      value: formData.relationship,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.relationship
    }
    },
    {
      label: 'Cell Number',
      type: 'number',
      name: 'cellNumber',
      value: formData.cellNumber,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.cellNumber
    }
    },
    {
      label: 'Landline Number',
      type: 'number',
      name: 'landLineNumber',
      value: formData.landLineNumber,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.landLineNumber
    }
    },
    {
      label: 'isDependent',
      type: 'checkbox',
      name: 'isDependent',
      value: formData.isDependent,
      onChange: handleInputChange,
      isRequired: false,
      error: {
        status: false,
        message: ''
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
              { allUserRelatives.length > 0 &&
                <div className='space-y-4 max-h-[400px] mobile:w-full overflow-auto w-[300px]'>
                  { 
                      allUserRelatives?.map((item, index) => {
                          return <RelativeBlock item={item} key={index} />
                      })
                  }
              </div>
              }
              <CUForm config={formDataConfig} handleInputChange={handleInputChange}  isFull={allUserRelatives.length >0 ? true : false} validationErrors={validationErrors}/>
            </div>
            </>
          }
          btnConfig={btnConfig}
          validationErrors={validationErrors}
          check={(closeModal) => {
            if (!validationErrors?.name && !validationErrors?.relationship && !validationErrors?.cellNumber && !validationErrors?.landLineNumber
              && formData?.name && formData?.relationship && formData?.cellNumber && formData?.landLineNumber ) {
              closeModal()
            }
          }}
        />
      </div>
      <div className='max-h-[250px] overflow-auto'>
        {
          allUserRelatives?.map((item, index) => {
            return <div key={index} className="flex flex-col space-y-4">
              <span className="text-gray-600 p-4">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.name}</div>
                <div className='flex justify-between items-center px-10'>
                  <p>{item?.cellNumber}</p>
                  <p>{item?.relationship}</p>
                </div>
              </span>
            </div>
          })
        }
      </div>
    </>
  )
}

export default RelativesForm
