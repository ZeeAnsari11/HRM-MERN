import React from 'react'

const CTForm = ({ formData, handleInputChange , validationErrors}) => {
    return (
        <form>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.name}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Start Time</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.startTime && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.startTime}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">End Time</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.endTime && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.endTime}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Is Overnight</label>
                <select
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    name="isOverNight"
                    value={formData.isOverNight}
                    onChange={handleInputChange}
                    required
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Late Buffer</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="number"
                    name="lateBuffer"
                    placeholder='Enter the minutes'
                    value={formData.lateBuffer}
                    onChange={handleInputChange}
                    min={0}
                    max={1440}
                    required
                />
                {validationErrors?.lateBuffer && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.lateBuffer}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Early Buffer</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="number"
                    name="earlyBuffer"
                    value={formData.earlyBuffer}
                    placeholder='Enter the minutes'
                    onChange={handleInputChange}
                    min={0}
                    max={1440}
                    required
                />
                {validationErrors?.earlyBuffer && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.earlyBuffer}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Punch Buffer Start</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="number"
                    name="punchBufferStart"
                    value={formData.punchBufferStart}
                    placeholder='Enter the minutes'
                    onChange={handleInputChange}
                    min={0}
                    max={1440}
                    required
                />
                {validationErrors?.punchBufferStart && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.punchBufferStart}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Punch Buffer End</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="number"
                    name="punchBufferEnd"
                    placeholder='Enter the minutes'
                    value={formData.punchBufferEnd}
                    onChange={handleInputChange}
                    min={0}
                    max={1440}
                    required
                />
                {validationErrors?.punchBufferEnd && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.punchBufferEnd}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Name</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="text"
                    name="break.name"
                    value={formData.break.name}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.break?.name && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.break?.name}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Start Time</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="time"
                    name="break.startTime"
                    value={formData.break.startTime}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.break?.startTime && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.break?.startTime}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break End Time</label>
                <input
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    type="time"
                    name="break.endTime"
                    value={formData.break.endTime}
                    onChange={handleInputChange}
                    required
                />
                {validationErrors?.break?.endTime && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors?.break?.endTime}</p>
                )}
            </div>
            <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Inclusive</label>
                <select
                    className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                    name="break.inclusive"
                    value={formData.break.inclusive}
                    onChange={handleInputChange}
                    required
                >
                    <option value={true}>True</option>
                    <option value={false}>False</option>
                </select>
               
            </div>
        </form>
    )
}

export default CTForm
