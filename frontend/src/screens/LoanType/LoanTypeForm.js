import React from 'react';
import MultiSelect from '../../components/SelectForm/MultiSelect';

export default function LoanTypeForm({formData, handleInputChange, desiginations}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Create Loan Type Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Select Designation(s) </label>
            <MultiSelect handleInputChange= {handleInputChange} desiginations = {desiginations} formData={formData}/>
          </div>
        </form>
}
