import React from 'react'
import { commonStyles } from '../../../styles/common'

const OrganizationalInfo = ({RestDays, page, setError, validate, handlePrevPage, handleNextPage, handleFileChange, formData, error, handleInputChange, setFormData}) => {
  return (
    <form className="max-h-[400px] overflow-auto" onSubmit={(e) => {
        e.preventDefault()
        if (validate()) handleNextPage()
      }}>
        <div className="flex flex-col mb-4 text-left">
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
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring 
                      "
          />
          {(error.name) && <p className={commonStyles.error}>{error.name}</p>}
          </div>

          <div className="flex flex-col mb-4 text-left">
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
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring
                      "
          />
          {(error.logo) && <p className={commonStyles.error}>{error.logo}</p>}
          </div>

          <div className="flex flex-col mb-4 text-left">
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
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring"
          />
          {(error.address) && <p className={commonStyles.error}>{error.address}</p>}
          </div>

          <div className="flex flex-col mb-4 text-left">
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
            onChange={(e) => {
              setFormData({...formData, userCode:{prefix: e.target.value}})
              setError((prevErrors) => ({
                ...prevErrors,
                [e.target.name]: e.target.value ? '' : `${e.target.name} is required`,
              }));
            }}
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring
                        
                      "
          />
          {(error.prefix) && <p className={commonStyles.error}>{error.prefix}</p>}
          </div>

          <div className="flex flex-col mb-4 text-left">
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
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring
                      "
          />
          {(error.description) && <p className={commonStyles.error}>{error.description}</p>}
          </div>
          <RestDays error={error['restDays']} firstUser={true} handleInputChange={handleInputChange} value={formData['restDays']}/>

        <div className="flex items-center py-4 justify-between">
          {
            (page > 1) && (
              <button
              type='button'
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
              
              <button
                type='submit'
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
      </form>
  )
}

export default OrganizationalInfo
