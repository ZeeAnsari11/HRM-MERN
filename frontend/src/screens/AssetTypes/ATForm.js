import Countries from '../User/elements/Countries';
import React from 'react';

export default function ATForm({formData, handleInputChange, validationErrors}) {
    return <form>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-1">Type</label>
            <input
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
            {validationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                )}
          </div>
        </form>
}