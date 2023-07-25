import Countries from '../User/elements/Countries';
import React from 'react';

export default function LTForm({formData, handleInputChange}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
        
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Short Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="shortName"
              id="shortName"
              value={formData.shortName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Accumulative Count</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              name="accumulativeCount"
              id="accumulativeCount"
              value={formData.accumulativeCount}
              onChange={handleInputChange}
              required
            />
          </div>
          
        </form>
}