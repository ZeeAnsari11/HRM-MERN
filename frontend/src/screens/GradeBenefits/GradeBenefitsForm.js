import MultiSelect from './MultiSelect';
import React from 'react';

export default function GradeBenefitsForm({ formData, handleInputChange, gradesList, validationErrors }) {
  return <form>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Name</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="text"
        name="name"
        value={formData?.name}
        onChange={handleInputChange}
        required
      />
      {validationErrors.name && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Description</label>
      <input
        className="border border-gray-300 rounded-md px-3 py-2 w-full"
        type="text"
        name="description"
        value={formData?.description}
        onChange={handleInputChange}
        required
      />
      {validationErrors.description && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
      )}
    </div>
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Select Grade(s) </label>
      <MultiSelect handleInputChange={handleInputChange} grades={gradesList} formData={formData} />
    </div>
    {validationErrors.grade && (
      <p className="text-red-500 text-xs mt-1">{validationErrors.grade}</p>
    )}
  </form>
}
