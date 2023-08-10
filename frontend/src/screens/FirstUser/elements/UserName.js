import React from 'react'
import { commonStyles } from '../../../styles/common';

const UserName = ({page, validate, handleNextPage, formData, error, handleInputChange }) => {
  return (
    <form className="mx-auto" onSubmit={(e) => {
        e.preventDefault();
        if (validate()) handleNextPage();
      }}>
        <div className="flex flex-col text-left mb-4">
          <label
            htmlFor="firstName"
            className="inline-flex mb-2 text-sm text-gray-800"
          >
            Please enter your first name
          </label>
          <input
            
            name="firstName"
            value={formData['firstName']}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
          />
          {(error.firstName) && <p className={commonStyles.error}>{error.firstName}</p>}
        </div>

        <div className="flex flex-col mb-4 text-left">
          <label
            htmlFor="lastName"
            className="inline-flex mb-2 text-sm text-gray-800"
          >
            Please enter your last name
          </label>
          <input 
            name="lastName"
            value={formData['lastName']}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
          />
          {(error.lastName) && <p className={commonStyles.error}>{error.lastName}</p>}
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
      </form>
  )
}

export default UserName
