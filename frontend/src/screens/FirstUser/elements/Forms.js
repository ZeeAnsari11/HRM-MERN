import React, { useState } from 'react'

import CBForm from '../../Branches/CBForm';
import Credential from './Credential';
import Loader from '../../../components/Loader';
import OrganizationalInfo from './OrganizationalInfo';
import RestDays from '../../User/elements/RestDays';
import UserName from './UserName';
import { commonStyles } from '../../../styles/common';
import { createOrganizationFirstUser } from '../../../api/organization';
import { useNavigate } from 'react-router-dom';

// email: '',
// pswd: '',
//    cpswd: '',
//     orgName: '',
//     orgLogo: '',
//     orgAddress: '',
//     orgPrefix: '',
//     orgDescription: '',
//     orgRestDays: '',
//     branchName: '',
//     branchCountry: '',
//     branchCity: '',
//     branchDescription: '',
const Forms = ({ page, handlePrevPage, handleNextPage }) => {
  const navigation = useNavigate()
  const [file, setFile] = useState(null);
  const [error, setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    c_password: '',
    name: '',
    logo: '',
    address: '',
    prefix: '',
    description: '',
    restDays: [],
  })
  const [loader, setLoader] = useState(false)
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    c_password: '',
    name: '',
    roaster: {
      restDays: [],
    },
    logo: '',
    address: '',
    description: '',
    restDays: [],
    location: {
      type: "Point 2",
      coordinates: [
          28.2421,
          38.5751
      ]
    },
    userCode: {
      prefix: ""
    },
    timeZone: "EST",
    start: Date.now(),
  })
  const [branch, setBranch] = useState({})
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setError((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: event.target.value ? '' : `${event.target.name} is required`,
    }));
  };
  
  const handleInputChangeBranch = ({target: {name, value}}) => {
    setBranch(branch => ({...branch, [name]: value}));
  };

  const ValidateStepOne = () => {
    const newErrors = {};
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    setError(newErrors);

    return (Object.keys(newErrors).length === 0)
  }

  const ValidateStepTwo = () => {

    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    if (!formData.c_password) {
      newErrors.c_password = 'Confirm Password is required';
    } 
    else if (formData.password !== formData.c_password) {
      newErrors.c_password = 'Passwords do not match';
    }

    setError(newErrors);
    return (Object.keys(newErrors).length === 0)
  }
  
  const ValidateStepThree = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Organization name is required';
    }
    if (!formData.name) {
      newErrors.logo = 'Organization logo is required';
    }
    if (!formData.userCode.prefix) {
      newErrors.prefix = 'Organization prefix is required';
    }
    if (!formData.description) {
      newErrors.description = 'Organization description is required';
    }
    if (!formData.address) {
      newErrors.address = 'Organization address is required';
    }
    if (formData.roaster.restDays.length === 0) {
      newErrors.restDays = 'Rest Days are required';
    }
    setError(newErrors);
    return (Object.keys(newErrors).length === 0)
  }

  const handleInputChange = ({target: {name, value}}) => {
    setFormData(formData => ({...formData, [name]: value}));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: value ? '' : `${name} is required`,
    }));
  };
  console.log("Form Data", formData)
  return (
    <div>
      {
        (page === 1) && ( <UserName page={page} validate={ValidateStepOne} handleNextPage={handleNextPage} formData={formData} error={error} handleInputChange={handleInputChange}/> )
      }
      {
        (page === 2) && ( <Credential validate={ValidateStepTwo} handlePrevPage={handlePrevPage} handleNextPage={handleNextPage} formData={formData} error={error} handleInputChange={handleInputChange}/>)
      }
      {
        (page === 3) && ( <OrganizationalInfo RestDays={RestDays} setError={setError} page={page} validate={ValidateStepThree} handlePrevPage={handlePrevPage} handleFileChange={handleFileChange} handleNextPage={handleNextPage} formData={formData} error={error} handleInputChange={handleInputChange} setFormData={setFormData}/>)
      }
      {
        (page === 4) && (
          <>
          <CBForm disableFields={loader} formData={branch} handleInputChange={handleInputChangeBranch}/>
          <div className='w-full'>
          <button
              className="px-6
                          py-2
                          text-sm text-white
                          bg-[#1567B1]
                          rounded-lg
                          outline-none
                          hover:bg-[#1567D7]
                          flex float-right
                        "
              onClick={() => {
                setLoader(true)
                let restDays = formData.roaster.restDays;
                let obj = {...formData}
                obj['restDays'] = restDays
                delete obj['roaster']
                delete obj['c_password']
                obj.branch = branch
                obj.logo = previewUrl
                obj.firstUser = true
                createOrganizationFirstUser(obj, navigation)
              }}
              disabled={loader}
              
            >
              Create Account
              {(loader) && <span className='px-3'><Loader color={'white'}/></span>}
            </button>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Forms
