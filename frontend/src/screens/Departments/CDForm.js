import React from 'react'

const CDForm = ({ branches, formData, handleInputChange }) => {
    console.log("========branchesList======deep in========", branches);
    console.log("========branchesList======deep in========", branches);


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
            </div>
            <div>
            <select
                name="branch"
                id="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
            >
                <option value="" className="border border-gray-300 rounded-md px-3 py-2 w-full"></option>
                {branches.map((branch) => (
                    <option key={branch._id} value={branch._id}> {/* Set the value to branch._id */}
                        {branch.name}
                    </option>
                ))}
            </select>
        </div>
        </form >
    )
}

export default CDForm