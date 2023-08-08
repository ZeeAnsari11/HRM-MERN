import React, { useState } from 'react'

import CBForm from '../../Branches/CBForm';
import Loader from '../../../components/Loader';
import RestDays from '../../User/elements/RestDays';
import { createOrganizationFirstUser } from '../../../api/organization';
import { useNavigate } from 'react-router-dom';

const Forms = ({ page, handlePrevPage, handleNextPage }) => {
  const navigation = useNavigate()
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false)
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = React.useState({
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
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(formData => ({ ...formData, [name]: value }));
  };
  const handleInputChangeBranch = ({ target: { name, value } }) => {
    setBranch(branch => ({ ...branch, [name]: value }));
  };
  return (
    <div>
      {
        (page === 1) && (
          <form className="mx-auto" onSubmit={(e) => {
            e.preventDefault();
            handleNextPage();
          }}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="firstName"
                className="inline-flex mb-2 text-sm text-gray-800"
              >
                Please enter your first name
              </label>
              <input
                required
                name="firstName"
                value={formData['firstName']}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
              />
            </div>

            <div className="flex flex-col mb-4">
              <label
                htmlFor="lastName"
                className="inline-flex mb-2 text-sm text-gray-800"
              >
                Please enter your last name
              </label>
              <input
                required
                name="lastName"
                value={formData['lastName']}
                onChange={handleInputChange}
                className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
              />
            </div>

            <div className="flex items-center py-4 justify-end">
              {
                (page < 3) && (
                  <button type='submit'
                    className="px-6 py-2 text-sm text-white bg-[#1567B1] rounded-lg outline-none hover:bg-[#1567D7] "
                  >
                    Next
                  </button>
                )
              }
            </div>
          </form>)
      }
      {
        (page === 2) && (<form className="mx-auto" onSubmit={(e) => {
          e.preventDefault();
          if (formData['password'] === formData['c_password']) handleNextPage();
        }}>
          <div className="flex flex-col mb-4 ">
            <label
              htmlFor="email"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your email
            </label>
            <input
              name="email"
              type="email"
              value={formData['email']}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="password"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your password
            </label>
            <input
              name="password"
              required
              value={formData['password']}
              onChange={handleInputChange}
              type="password"
              className="
                          w-full
                          px-3
                          py-2
                          text-gray-800
                          border
                          rounded
                          outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="c_password"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Confirm your password
            </label>
            <input
              required
              name="c_password"
              type="password"
              value={formData['c_password']}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
            />
          </div>

          <div className="flex items-center py-4 justify-between">
            <button
              onClick={handlePrevPage}
              className="
                          inline-flex
                          items-center
                          px-6
                          py-2
                          text-sm text-gray-800
                          rounded-lg
                          shadow
                          outline-none
                          gap-x-1
                          hover:bg-gray-100
                        "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
            <button type='submit'
              className="
                          px-6
                          py-2
                          text-sm text-white
                          bg-[#1567B1]
                          rounded-lg
                          outline-none
                          hover:bg-[#1567D7]
                          
                        "
            >
              Next
            </button>
          </div>
        </form>)
      }
      {
        (page === 3) && (<form className="mx-auto max-h-[400px] overflow-auto" onSubmit={(e) => {
          e.preventDefault()
          handleNextPage()
        }}>
          <div className="flex flex-col mb-4">
            <label
              htmlFor="name"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your organization's name
            </label>
            <input
              name="name"
              type="text"
              value={formData['name']}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="logo"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your organization's logo
            </label>
            <input
              name="logo"
              type="file"
              onChange={handleFileChange}
              accept=".png, .jpg, .jpeg"
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="address"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your organization's address
            </label>
            <input
              name="address"
              type="text"
              value={formData['address']}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="prefix"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your organization's prefix
            </label>
            <input
              name="prefix"
              type="text"
              value={formData.userCode['prefix']}
              onChange={(e) => setFormData({ ...formData, userCode: { prefix: e.target.value } })}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>

          <div className="flex flex-col mb-4">
            <label
              htmlFor="restdays"
              className="inline-flex mb-2 text-sm text-gray-800"
            >
              Please enter your organization's description
            </label>
            <input
              name="description"
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                          bg-gray-50
                          focus:ring
                          
                        "
            />
          </div>
          <RestDays firstUser={true} handleInputChange={handleInputChange} value={formData['restDays']} />


          <div className="flex items-center py-4 justify-between">
            {
              (page > 1) && (
                <button
                  onClick={handlePrevPage}
                  className="
                          inline-flex
                          items-center
                          px-6
                          py-2
                          text-sm text-gray-800
                          rounded-lg
                          shadow
                          outline-none
                          gap-x-1
                          hover:bg-gray-100
                        "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </button>
              )
            }
            {
              (page < 4) && (

                <button onClick={handleNextPage}
                  className="
                          px-6
                          py-2
                          text-sm text-white
                          bg-[#1567B1]
                          rounded-lg
                          outline-none
                          hover:bg-[#1567D7]
                          
                        "
                >
                  Next
                </button>
              )
            }
          </div>
        </form>)
      }
      {
        (page === 4) && (
          <>
            <CBForm disableFields={loader} formData={branch} handleInputChange={handleInputChangeBranch} />
            <div className='w-full'>
              <button
                className="px-6
                  py-2
                  text-sm text-white
                  bg-[#1567B1]
                  rounded-lg
                  outline-none
                  hover:bg-[#1567D7]
                  flex float-right"
                  onClick={() => {
                  setButtonDisabled(true); // Disable the button on click
                  setLoader(true);
                  let restDays = formData.roaster.restDays;
                  let obj = { ...formData };
                  obj['restDays'] = restDays;
                  delete obj['roaster'];
                  delete obj['c_password'];
                  obj.branch = branch;
                  obj.logo = previewUrl;
                  obj.firstUser = true;
                  createOrganizationFirstUser(obj, navigation);
                }}
                disabled={isButtonDisabled} // Set the disabled attribute based on the state
              >
                Create Account
                {loader && <span className="px-3"><Loader color={'white'} /></span>}
              </button>

            </div>
          </>
        )
      }
    </div>
  )
}

export default Forms
