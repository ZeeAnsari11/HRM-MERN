import React from 'react';
import Countries from '../User/elements/Countries';

export default function AllowanceForm({formData, handleInputChange}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Allowance Name</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="allowanceName"
              value={formData.allowanceName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Base Salary % </label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="number"
              name="percrentageOfBaseSalary"
              value={formData.percrentageOfBaseSalary}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
}