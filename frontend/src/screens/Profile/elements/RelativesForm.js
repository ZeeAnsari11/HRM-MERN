import { faMailBulk, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import Modal from '../../../components/Modal'
import { createRelative, deleteRelative, getRelatives, resetStates, updateRelative } from '../../../api/relatives'
import { useDispatch, useSelector } from 'react-redux'
import { selectRelativeClickState, selectSelectedRelative, selectUserRelative, setClickState } from '../../../states/reducers/slices/backend/RelativesSlice'
import CUForm from './common/CUForm'

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

  const handleSubmit = (trigger) => {
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      isRequired: true
    },
    {
      label: 'Relationship',
      type: 'text',
      name: 'relationship',
      value: formData.relationship,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Cell Number',
      type: 'number',
      name: 'cellNumber',
      value: formData.cellNumber,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Landline Number',
      type: 'number',
      name: 'landLineNumber',
      value: formData.landLineNumber,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'isDependent',
      type: 'checkbox',
      name: 'isDependent',
      value: formData.isDependent,
      onChange: handleInputChange,
      isRequired: false
    }

  ]
  return (
    <>
      <div className="flex justify-between items-center border-l-8 border-backgroundDark font-bold text-lg">
        <h1 className="px-4 text-2xl">{title}</h1>
        <Modal
          action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
          title={title}
          onClose={() => resetStates(dispatcher)}
          Element={
            <>
            <div className='flex justify-between'>
              <div className='space-y-4 max-h-[400px] overflow-auto w-[300px]'>
                  {
                      allUserRelatives?.map((item, index) => {
                          return <RelativeBlock item={item} key={index} />
                      })
                  }
              </div>
              <CUForm config={formDataConfig} handleInputChange={handleInputChange} />
            </div>
            </>
          }
          btnConfig={btnConfig}
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
