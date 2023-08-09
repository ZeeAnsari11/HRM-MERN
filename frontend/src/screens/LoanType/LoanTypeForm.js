import MultiSelect from '../../components/SelectForm/MultiSelect';
import React from 'react';

export default function LoanTypeForm({formData, handleInputChange, desiginationsList, validationErrors}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Create Loan Type Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="type"
              value={formData?.type}
              onChange={handleInputChange}
              required
            />
            {validationErrors.type && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.type}</p>
              )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Select Designation(s) </label>
            <MultiSelect handleInputChange= {handleInputChange} desiginations = {desiginationsList} formData={formData}/>
          </div>
          {validationErrors.designations && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.designations}</p>
             )}
        </form>
}
