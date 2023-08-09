import Countries from '../User/elements/Countries';
import React from 'react';

export default function LTForm({ formData, handleInputChange ,validationErrors}) {
  return <div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Name</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        require
      />
      {validationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                )}
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
      {validationErrors.shortName && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.shortName}</p>
                )}
    </div>
    <div className="mb-4 flex space-x-2 items-center">
      <label className="block text-sm font-bold">Short</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2"
        type="checkbox"
        name="shortLeave"
        checked={formData.shortLeave}
        onChange={handleInputChange}
      />
      
    </div>
    <div className="mb-4 flex space-x-2 items-center">
      <label className="block text-sm font-bold">Attachment Required</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2"
        type="checkbox"
        name="attachmentRequired"
        checked={formData.attachmentRequired}
        onChange={handleInputChange}
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
      {validationErrors.accumulativeCount && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.accumulativeCount}</p>
                )}
    </div>

  </div>
}