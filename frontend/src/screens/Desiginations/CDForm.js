import React from 'react'

const CDForm = ({formData, handleInputChange}) => {
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
            </div>
        </form>
    )
}

export default CDForm
