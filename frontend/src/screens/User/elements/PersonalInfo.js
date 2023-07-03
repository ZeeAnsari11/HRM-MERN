import React from 'react'
import Countries from './Countries'

const PersonalInfo = ({ changePageNumber, handleInputChange }) => {

    return (
        <form className="lg:col-span-2" onSubmit={(e) => {
            e.preventDefault();
            changePageNumber();
        }}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-3">
                    <label htmlFor="firstName">First Name</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                </div>
                <div className="md:col-span-2">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Last Name"
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                </div>
                <div className="md:col-span-3">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={handleInputChange}
                        placeholder="email@domain.com"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        name="password"
                        id="password"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={handleInputChange}
                        placeholder="********"
                        required
                    />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="email">Personal Email</label>
                    <input
                        type="text"
                        name="personalEmail"
                        id="personalEmail"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={handleInputChange}
                        placeholder="email@domain.com"
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="gender">Gender</label>
                    <select
                        name="gender"
                        id="gender"
                        onChange={handleInputChange}
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        required
                    >
                        <option value=''>Select Gender</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                        <option value='others'>Others</option>
                    </select>
                </div>
                
                <div className="md:col-span-3">
                    <label htmlFor="address">Full Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Full Address"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="country">Country</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                            name="country"
                            id="country"
                            placeholder="Country"
                            onChange={handleInputChange}
                            className="px-4 outline-none text-gray-800 w-full bg-transparent"
                            required
                        >
                            <option value=''>Select Country</option>
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
                            onChange={handleInputChange}
                            placeholder="State"
                            className="px-4 outline-none text-gray-800 w-full bg-transparent"
                            required
                        />
                    </div>
                </div>
                <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        name="zipcode"
                        id="zipcode"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Zipcode"
                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        onChange={handleInputChange}
                        id="dob"
                        required
                        className="transition-all h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="religion">Religion</label>
                    <input
                        type="text"
                        name="religion"
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        id="nationality"
                        required
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Nationality"

                    />
                </div>
                <div className="md:col-span-3">
                    <label htmlFor="contact">Contact Number</label>
                    <input
                        type="text"
                        name="contact"
                        onChange={handleInputChange}
                        id="contact"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Contact Number"
                        required

                    />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="blood-group">Blood Group</label>
                    <input
                        type="text"
                        name="blood-group"
                        onChange={handleInputChange}
                        id="blood-group"
                        className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        placeholder="Blood G"
                        defaultValue=""
                    />
                </div>

                <div className="md:col-span-5 text-right">
                    <div className="inline-flex items-end">
                        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PersonalInfo
