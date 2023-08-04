import Countries from '../User/elements/Countries';
import React from 'react';

export default function CBForm({formData, handleInputChange,disableFields}) {
    return <form className='text-left'>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Branch Name</label>
            <input
              disabled={disableFields}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">

            <label className="block text-sm font-bold mb-1">Country</label>
            <div className="h-10 bg-white flex border border-gray-200 rounded items-center mt-1">
              <select
              disabled={disableFields}
                name="country"
                id="country"
                value={formData.country}
                placeholder="Country"
                onChange={handleInputChange}
                className="px-4 outline-none  text-gray-800 w-full bg-transparent"
                required
              >
                <option value=''>Select Country</option>
                <Countries />
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">City</label>
            <input
            disabled={disableFields}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">
              Description
            </label>
            <textarea
              disabled={disableFields}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
        </form>
}