import React from 'react';
import Countries from '../User/elements/Countries';

export default function ATForm({formData, handleInputChange}) {
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
          </div>
        </form>
}