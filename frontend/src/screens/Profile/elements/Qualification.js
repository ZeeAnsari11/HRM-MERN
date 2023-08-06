import React, { useEffect, useState } from 'react'
import { createQualification, deleteQualification, getQualifications, resetStates, updateQualification } from '../../../api/qualifications'
import { faMailBulk, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { selectQualificationsClickState, selectSelectedQualification, selectUserQualifications, setClickState } from '../../../states/reducers/slices/backend/QualificationSlice'
import { useDispatch, useSelector } from 'react-redux'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'

const getYear = (date) => {
  const dt = new Date(date);
  return dt?.getFullYear();
}

const QualificationBlock = ({ item }) => {
  const dispatcher = useDispatch();
  const [hoverState, setHoverState] = useState(false);
  const selectState = useSelector(selectQualificationsClickState);
  return <div className="flex flex-col space-y-4 relative" onMouseLeave={() => setHoverState(false)} onMouseEnter={() => setHoverState(true)}>
    <span className={`${(selectState === item._id) ? 'bg-primaryColorLight text-white' : 'bg-gray-300'} text-gray-600 cursor-pointer hover:bg-gray-400 hover:shadow-sm rounded-md p-4`}>
      <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.instituteName}</div>
      <div className='flex justify-between items-center'>
        <p>{item?.degreeTitle}</p>
        <p className='text-sm px-10 mobile:px-0'>{getYear(item?.starting)} - {getYear(item?.ending)}</p>
      </div>
    </span>
    <div className={`absolute flex justify-evenly items-center transition-opacity delay-75 top-0 !mt-0 rounded-md bg-lightText w-full h-full ${hoverState ? 'opacity-100' : 'opacity-0'}`}>
      <FontAwesomeIcon className='cursor-pointer hover:text-gray-600' onClick={() => deleteQualification(item._id, dispatcher)} icon={faTrash}/>
      <div className='w-[2px] h-1/2 bg-gray-500'></div>
      <FontAwesomeIcon className='cursor-pointer  hover:text-gray-600' onClick={() => dispatcher(setClickState(item))} icon={faPencil}/>
    </div>
    </div>
}

const Qualification = ({ userID }) => {
  const dispatcher = useDispatch();
  const title = "Qualifications"
  const allUserExperiences = useSelector(selectUserQualifications);
  const selectedExperience = useSelector(selectSelectedQualification);
  const [formData, setFormData] = useState({
    ...selectedExperience, user: userID
  })

  useEffect(() => {
    getQualifications(userID, dispatcher);
    setFormData({
      ...selectedExperience, user: userID
    })
  }, [selectedExperience])

  const handleSubmit = (trigger) => {
    if (formData.id === undefined || formData.id === '') {
      createQualification(formData, trigger)
    }
    else {
      let id = formData.id;
      let updateObj = {
        instituteName: formData.instituteName,
        degreeTitle: formData.degreeTitle,
        isDegreeCompleted: formData.isDegreeCompleted,
        starting: formData.starting,
        ending: formData.ending
      }
      updateQualification(id, updateObj, dispatcher, trigger);
    }
    setFormData({
        id: '',
        instituteName: '',
        degreeTitle:'',
        isDegreeCompleted: false,
        starting: '',
        ending: ''
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
      label: 'Institute Name',
      type: 'text',
      name: 'instituteName',
      value: formData.instituteName,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Degree Title',
      type: 'text',
      name: 'degreeTitle',
      value: formData.degreeTitle,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Is Degree Completed',
      type: 'checkbox',
      name: 'isDegreeCompleted',
      value: formData.isDegreeCompleted,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Starting Date',
      type: 'date',
      name: 'starting',
      value: formData.starting,
      onChange: handleInputChange,
      isRequired: true
    },
    {
      label: 'Ending Date',
      type: 'date',
      name: 'ending',
      value: formData.ending,
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
                          return <QualificationBlock item={item} key={index} />
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
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.instituteName}</div>
                  <p className='text-md px-10'>{item?.degreeTitle}</p>
                  <p className='text-sm px-10'>{getYear(item?.starting)} - {getYear(item?.ending)}</p>
              </span>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Qualification