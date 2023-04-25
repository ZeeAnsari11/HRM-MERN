import React from 'react'
import Countries from './Countries'

const PersonalInfo = ({changePageNumber}) => {
  return (
    <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                    <label htmlFor="full_name">Full Name</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            placeholder="First Name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            defaultValue=""
                        />
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            placeholder="Last Name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            defaultValue=""
                        />
                    </div>

                </div>
                <div className="md:col-span-5">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder="email@domain.com"
                    />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="address">Address / Street</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue=""
                        placeholder=""
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    >
                        <option value='' disabled>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="country">Country</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                            name="country"
                            id="country"
                            placeholder="Country"
                            className="px-4 outline-none text-gray-800 w-full bg-transparent"
                        >
                            <option value='' disabled>Select Country</option>
                            <Countries />
                        </select>

                    </div>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                            name="state"
                            id="state"
                            placeholder="State"
                            className="px-4 outline-none text-gray-800 w-full bg-transparent"
                            defaultValue=""
                        />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                        type="text"
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue=""
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder=""
                        defaultValue=""
                    />
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="blood-group">Blood Group</label>
                    <input
                        type="text"
                        name="blood-group"
                        id="blood-group"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Blood Group"
                        defaultValue=""
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="religion">Religion</label>
                    <input
                        type="text"
                        name="religion"
                        id="religion"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Religion"
                        defaultValue=""
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="nationality">Nationality</label>
                    <input
                        type="text"
                        name="nationality"
                        id="nationality"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Nationality"

                    />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="contact">Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Contact Number"

                    />
                </div>

                <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                        <button onClick={changePageNumber} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default PersonalInfo
