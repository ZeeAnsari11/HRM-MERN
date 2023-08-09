import Countries from '../User/elements/Countries';
import React from 'react';

export default function AllowanceForm({formData, handleInputChange, validationErrors}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Allowance Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="allowanceName"
              value={formData?.allowanceName}
              onChange={handleInputChange}
              required
            />
            {validationErrors?.allowanceName && (
        <p className="text-red-500 text-xs mt-1">{validationErrors?.allowanceName}</p>
      )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Base Salary % </label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              name="percrentageOfBaseSalary"
              value={formData?.percrentageOfBaseSalary}
              onChange={handleInputChange}
              required
            />
            {validationErrors?.percrentageOfBaseSalary && (
        <p className="text-red-500 text-xs mt-1">{validationErrors.percrentageOfBaseSalary}</p>
      )}
          </div>
        </form>
}