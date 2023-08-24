import React, { useEffect, useState } from 'react'
import { createCertification, deleteCertifications, getCertifications, resetStates, updateCertification } from '../../../api/certifications'
import { faMailBulk, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import { selectCertificationClickState, selectSelectedCertification, selectUserCertifications, setClickState } from '../../../states/reducers/slices/backend/Certificates'
import { useDispatch, useSelector } from 'react-redux'

import CUForm from './common/CUForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from '../../../components/Modal'

const CertificationBlock = ({ item }) => {
  const dispatcher = useDispatch();
  const selectState = useSelector(selectCertificationClickState);
  const [hoverState, setHoverState] = useState(false);

  return <div className="flex flex-col space-y-4 relative" onMouseLeave={() => setHoverState(false)} onMouseEnter={() => setHoverState(true)}>
    <span className={`${(selectState === item._id) ? 'bg-primaryColorLight text-white' : 'bg-gray-300'} text-gray-600 cursor-pointer hover:bg-gray-400 hover:shadow-sm rounded-md p-4`}>
      <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.instituteName}</div>
      <div className='flex justify-between items-center'>
        <p>{item?.certificateTitle}</p>
        <p>{item?.certificationYear}</p>
      </div>
    </span>
    <div className={`absolute flex cursor-pointer justify-evenly items-center transition-opacity top-0 !mt-0 rounded-md bg-lightText w-full h-full ${hoverState ? 'opacity-100' : 'opacity-0'}`}>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => deleteCertifications(item._id, dispatcher)} icon={faTrash} />
      <div className='w-[2px] h-1/2 bg-gray-500'></div>
      <FontAwesomeIcon className='hover:text-gray-600' onClick={() => dispatcher(setClickState(item))} icon={faPencil} />
    </div>
  </div>
}

const Certifications = ({ userID }) => {
  const dispatcher = useDispatch();
  const title = "Certifications"
  const allUserCertifications = useSelector(selectUserCertifications);
  const selectedCertifications = useSelector(selectSelectedCertification);
  const [formData, setFormData] = useState({
    ...selectedCertifications, user: userID
  })

  const [validationErrors, setValidationErrors] = React.useState({
    instituteName: '',
    certificateTitle: '',
    certificationYear: ''

  });

  useEffect(() => {
    getCertifications(userID, dispatcher);
    console.log("Something changed")
    setFormData({
      ...selectedCertifications, user: userID
    })
  }, [selectedCertifications])

  const handleSubmit = (trigger) => {
    const newValidationErrors = {};
    console.log("========ormData.instituteName==",formData.instituteName);
    if (formData.instituteName == '' || formData.instituteName == undefined) {
      console.log("======1======");
      newValidationErrors.instituteName = "Institute Name is required.";
    }
    console.log("========formData.certificateTitle==",formData.certificateTitle);

    if (formData.certificateTitle == '' || formData.certificateTitle == undefined) {
      console.log("=====2======");
      newValidationErrors.certificateTitle = "Certificate Title is required.";
    }
    console.log("======formData.certificationYear===",formData.certificationYear);
    if (formData.certificationYear == '' || formData.certificationYear == undefined) {
      console.log("====3=====");
      newValidationErrors.certificationYear = "Certification Year is required.";
    }

    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }

    if (formData.id === undefined || formData.id === '') {
      createCertification(formData, trigger)
    }
    else {
      let id = formData.id;
      let updateObj = {
        instituteName: formData.instituteName,
        certificateTitle: formData.certificateTitle,
        certificationYear: formData.certificationYear,
      }
      updateCertification(id, updateObj, dispatcher, trigger);
    }
    setFormData({
      id: '',
      instituteName: '',
      certificateTitle: '',
      certificationYear: '',
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
      label: 'Institute Name',
      type: 'text',
      name: 'instituteName',
      value: formData.instituteName,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.instituteName
      }
    },
    {
      label: 'Certification Titile',
      type: 'text',
      name: 'certificateTitle',
      value: formData.certificateTitle,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.certificateTitle
      }
    },
    {
      label: 'Certification Year',
      type: 'text',
      name: 'certificationYear',
      value: formData.certificationYear,
      onChange: handleInputChange,
      isRequired: true,
      error: {
        status: false,
        message: validationErrors.certificationYear
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
              { allUserCertifications.length > 0 &&
                <div className='space-y-4 max-h-[400px] mobile:w-full overflow-auto w-[300px]'>
                  { 
                      allUserCertifications?.map((item, index) => {
                          return <CertificationBlock item={item} key={index} />
                      })
                  }
              </div>
              }
                <CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={allUserCertifications.length >0 ? true : false} validationErrors={validationErrors}/>
              </div>
            </>
          }
          btnConfig={btnConfig}
          validationErrors={validationErrors}
          check={(closeModal) => {
            if (!validationErrors?.certificationYear && !validationErrors?.certificateTitle && !validationErrors?.instituteName &&
              formData?.certificationYear && formData?.certificateTitle && formData?.instituteName) {
              closeModal()
            }
          }}
        />
      </div>
      <div className='max-h-[250px] overflow-auto'>
        {
          allUserCertifications?.map((item, index) => {
            return <div key={index} className="flex flex-col space-y-4">
              <span className="text-gray-600 p-4">
                <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />{item?.instituteName}</div>
                <div className='flex justify-between items-center px-10'>
                  <p>{item?.certificateTitle}</p>
                  <p>{item?.certificationYear}</p>
                </div>
              </span>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Certifications