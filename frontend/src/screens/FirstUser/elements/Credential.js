import React from 'react'
import { commonStyles } from '../../../styles/common';

const Credential = ({validate,handlePrevPage, handleNextPage, formData, error, handleInputChange }) => {
  return (
    <form className="mx-auto" onSubmit={(e) => {
        e.preventDefault();
        if (validate()) handleNextPage();
      }}>
        <div className="flex flex-col mb-4 text-left">
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
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none
                        bg-gray-50
                        focus:ring"
          />
          {error.email && <p className={commonStyles.error}>{error.email}</p>}
        </div>

        <div className="flex flex-col mb-4 text-left">
          <label
            htmlFor="password"
            className="inline-flex mb-2 text-sm text-gray-800"
          >
            Please enter your password
          </label>
          <input
            name="password"
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
                        focus:ring"
          />
          {error.password && <p className={commonStyles.error}>{error.password}</p>}
        </div>

        <div className="flex flex-col mb-4 text-left">
          <label
            htmlFor="c_password"
            className="inline-flex mb-2 text-sm text-gray-800"
          >
            Confirm your password
          </label>
          <input
            name="c_password"
            type="password"
            value={formData['c_password']}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-gray-800 border rounded outline-none bg-gray-50 focus:ring "
          />
          {error.c_password && <p className={commonStyles.error}>{error.c_password}</p>}
        </div>

        <div className="flex items-center py-4 justify-between">
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
      </form>
  )
}

export default Credential
