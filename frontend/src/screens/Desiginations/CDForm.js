import React from 'react'

const CDForm = ({formData, handleInputChange, validationErrors}) => {
    return (
        <form>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Title</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors.title && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.title}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Short Name</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    type="text"
                    name="shortForm"
                    value={formData.shortForm}
                    onChange={handleInputChange}
                    required
                />
                 {validationErrors.shortForm && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.shortForm}</p>
                )}
            </div>
        </form>
    )
}

export default CDForm
