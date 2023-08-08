import React from 'react'

const CDForm = ({ branches, formData, handleInputChange, validationErrors}) => {

    return (
        <form>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                />
                 {validationErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                )}
            </div>
            <div>
            <label className="block text-sm font-bold mb-1">Branch</label>
            <select
                name="branch"
                id="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
            >
                <option value="" className="border border-gray-300 rounded-md px-3 py-2 w-full">Select Branch</option>
                {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}> {/* Set the value to branch._id */}
                        {branch.name}
                    </option>
                ))}
            </select>
            {validationErrors.branch && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.branch}</p>
                )}
        </div>
        </form >
    )
}

export default CDForm
