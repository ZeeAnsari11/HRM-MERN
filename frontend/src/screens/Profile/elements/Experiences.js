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
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => deleteExperience(item._id,dispatcher)} icon={faTrash}/>
      <div className='w-[2px] h-1/2 bg-gray-500'></div>
      <FontAwesomeIcon className='hover:text-gray-600'  onClick={() => dispatcher(setClickState(item))} icon={faPencil}/>
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

  useEffect(() => {
    getExperiences(userID, dispatcher);
    setFormData({
      ...selectedExperience, user: userID
    })
  }, [selectedExperience])

  const handleSubmit = (trigger) => {
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
        organization:'',
        experienceLetter: '',
        stack: '',
        reasonForLeaving: ''
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
      label: 'Designation',
      type: 'text',
      name: 'designation',
      value: formData.designation,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Organization',
      type: 'text',
      name: 'organization',
      value: formData.organization,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Experience Letter',
      type: 'text',
      name: 'experienceLetter',
      value: formData.experienceLetter,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Stack',
      type: 'text',
      name: 'stack',
      value: formData.stack,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Reason For Leaving',
      type: 'text',
      name: 'reasonForLeaving',
      value: formData.reasonForLeaving,
      onChange: handleInputChange,
      isRequired: false
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
              <div className='space-y-4 max-h-[400px] mobile:w-full overflow-auto w-[300px]'>
                  {
                      allUserExperiences?.map((item, index) => {
                          return <ExperiencesBlock item={item} key={index} />
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