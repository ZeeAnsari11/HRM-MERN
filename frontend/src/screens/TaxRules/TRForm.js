import React from 'react';

export default function TRForm({ formData, handleInputChange, disableFields, validationErrors, skip }) {
  return <form className='text-left'>
    {skip ? '' :
      <div className="mb-4">
        <label className="block text-sm font-bold mb-1">Rule No</label>
        <input
          disabled={disableFields}
          className="border border-gray-300 rounded-md px-3 py-2 w-full"
          type="number"
          name="ruleNo"
          value={formData?.ruleNo}
          onChange={handleInputChange}
          required
        />
        {validationErrors.ruleNo && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.ruleNo}</p>
        )}
      </div>}
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">From Amount</label>
      <input
        disabled={disableFields}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="number"
        name="fromAmount"
        id="fromAmount"
        value={formData?.fromAmount}
        onChange={handleInputChange}
        required
      />
      {validationErrors.fromAmount && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.fromAmount}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">To Amount</label>
      <input
        disabled={disableFields}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="number"
        name="toAmount"
        id="toAmount"
        value={formData?.toAmount}
        onChange={handleInputChange}
        required
      />
      {validationErrors.toAmount && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.toAmount}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Fix Rate</label>
      <input
        disabled={disableFields}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="number"
        name="fixRate"
        id="fixRate"
        value={formData?.fixRate}
        onChange={handleInputChange}
        required
      />
      {validationErrors.fixRate && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.fixRate}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">
        Percentage
      </label>
      <input
        disabled={disableFields}
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        name="percentage"
        value={formData?.percentage}
        onChange={handleInputChange}
        required
      ></input>
      {validationErrors.percentage && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.percentage}</p>
      )}
    </div>
  </form>
}