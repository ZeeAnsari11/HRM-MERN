import Countries from '../User/elements/Countries';
import React from 'react';

export default function SLTForm({ formData, handleInputChange ,validationErrors}) {
  console.log(formData)
  return <div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Name</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        
      />
      {validationErrors.name && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
      )}
    </div>

    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Shift Reduction (%)</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="number"
        name="shiftReductionInPercentage"
        id="shiftReductionInPercentage"
        value={formData.shiftReductionInPercentage}
        onChange={handleInputChange}
        
      />
      {validationErrors.shiftReductionInPercentage && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.shiftReductionInPercentage}</p>
      )}
    </div>


    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Balance</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="number"
        name="balance"
        id="balance"
        value={formData.balance}
        onChange={handleInputChange}
        
      />
      {validationErrors.balance && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.balance}</p>
      )}
    </div>

  </div>
}