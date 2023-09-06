import Countries from './Countries'
import React from 'react'
import { commonStyles } from '../../../styles/common';

const PersonalInfo = ({ disabled, changePageNumber, handleInputChange, formData, showButton, skip ,trigger}) => {
    console.log("===formData.phoneNumber====",formData.phoneNumber);
    const [errors, setErrors] = React.useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        personalEmail: false,
        gender: false,
        address: false,
        country: false,
        state: false,
        zipcode: false,
        dob: false,
        religion: false,
        nationality: false,
        phoneNumber: false,
        bloodGroup: false,
    });

    const validator = () => {
        const newErrors = { ...errors };
        let hasErrors = false;
        for (const field in newErrors) {
            if (!formData[field]) {
                newErrors[field] = true;
                hasErrors = true;
                trigger = true;
                
            } else {
                newErrors[field] = false;
            }
        }
        setErrors(newErrors);
        return hasErrors
    }
    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!validator()) {
            changePageNumber();
        }
    };
    const handler = (e) => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: e.target.value ? false : true,
        }));
    
        // Update the formData state in the parent component
        handleInputChange(e);
    }
    
    return (
        <form className="lg:col-span-2" onSubmit={handleFormSubmit}>
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className={`md:col-span-${skip ? '5' : '3'}`}>
                    <label htmlFor="firstName">First Name</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            disabled={disabled}
                            name="firstName"
                            id="firstName"
                            placeholder="First Name"
                            className={errors.firstName ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={handler}
                            value={formData.firstName}
                        />
                    </div>
                    {errors.firstName && <span className="text-red-500">Please fill out this field.</span>}

                </div>
                <div className="md:col-span-2">
                    <label htmlFor="lastName">Last Name</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            name="lastName"
                            disabled={disabled}
                            id="lastName"
                            placeholder="Last Name"
                            className={errors.lastName ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={handler}
                            value={formData.lastName}

                        />
                    </div>
                    {errors.lastName && <span className="text-red-500">Please fill out this field.</span>}

                </div>
                <div className="md:col-span-3">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        className={errors.email ? `${commonStyles.input} border-red-500` : commonStyles.input}
                        onChange={handler}
                        disabled={disabled}
                        placeholder="email@domain.com"
                        value={formData.email}

                    />
                    {errors.email && <span className="text-red-500">Please fill out this field.</span>}
                </div>

                {skip ? '' :
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={errors.password ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            onChange={handler}
                            disabled={disabled}
                            value={formData.password}
                            placeholder="********"

                        />
                        {errors.password && <span className="text-red-500">Please fill out this field.</span>}
                    </div>}
                <div className="md:col-span-3">
                    <label htmlFor="personalEmail">Personal Email</label>
                    <input
                        type="text"
                        name="personalEmail"
                        id="personalEmail"
                        disabled={disabled}
                        value={formData.personalEmail}
                        className={errors.personalEmail ? `${commonStyles.input} border-red-500` : commonStyles.input}
                        onChange={handler}
                        placeholder="email@domain.com"

                    />
                    {errors.personalEmail && <span className="text-red-500">Please fill out this field.</span>}
                </div>
                {skip ? '' :
                    <div className="md:col-span-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                            name="gender"
                            disabled={disabled}
                            id="gender"
                            onChange={handler}
                            className={errors.gender ? `${commonStyles.input} border-red-500` : commonStyles.input}
                            value={formData.gender}

                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.gender && <span className="text-red-500">Please fill out this field.</span>}
                    </div>}

                {skip ? '' : <div className="md:col-span-3">
                    <label htmlFor="address">Full Address</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        disabled={disabled}
                        className={errors.address ? `${commonStyles.input} border-red-500` : commonStyles.input}
                        placeholder="Full Address"
                        onChange={handler}

                    />
                    {errors.address && <span className="text-red-500">Please fill out this field.</span>}
                </div>}
                {
                    skip ? '' : <div className="md:col-span-2">
                    <label htmlFor="country">Country</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <select
                            name="country"
                            id="country"
                            disabled={disabled}
                            value={formData.country}
                            className={errors.country ? `px-4 outline-none text-gray-800 w-full bg-transparent border-red-500` : `px-4 outline-none text-gray-800 w-full bg-transparent`}
                            onChange={handler}

                        >
                            <option value="">Select Country</option>
                            <Countries />
                        </select>
                    </div>
                    {errors.country && <span className="text-red-500">Please fill out this field.</span>}
                </div>
                }
                {
                    skip ? '' : <div className="md:col-span-2">
                    <label htmlFor="state">State / province</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                            name="state"
                            id="state"
                            disabled={disabled}
                            value={formData.state}
                            onChange={handler}
                            className={errors.state ? `px-4 outline-none text-gray-800 w-full bg-transparent border-red-500` : `px-4 outline-none text-gray-800 w-full bg-transparent`}
                            placeholder="State"

                        />
                    </div>
                    {errors.state && <span className="text-red-500">Please fill out this field.</span>}
                </div>
                }
                {
                    skip ? '' : <div className="md:col-span-1">
                    <label htmlFor="zipcode">Zipcode</label>
                    <input
                        type="number"
                        value={formData.zipcode}
                        onChange={handler}
                        disabled={disabled}
                        name="zipcode"
                        id="zipcode"
                        className={errors.zipcode ? `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                        placeholder="Zipcode"
                    />
                    {errors.zipcode && <span className="text-red-500">Please fill out this field.</span>}
                </div>
                }
                {
                    skip ? '' : <div className="md:col-span-2">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handler}
                        disabled={disabled}
                        id="dob"

                        className={errors.dob ? `transition-all h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                    />
                    {errors.dob && <span className="text-red-500">Please fill out this field.</span>}
                </div>
                }
                <div className="md:col-span-2">
                    <div className="md:col-span-3">
                        <label htmlFor="religion">Religion</label>
                        <input
                            type="text"
                            name="religion"
                            value={formData.religion}
                            onChange={handler}
                            disabled={disabled}
                            id="religion"
                            className={errors.religion ? `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                            placeholder="Religion"
                            defaultValue=""
                        />
                        {errors.religion && <span className="text-red-500">Please fill out this field.</span>}
                    </div>
                    <div className={`md:col-span-${skip ? '5' : '2'}`}>
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handler}
                            disabled={disabled}
                            id="nationality"

                            className={errors.nationality ? `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                            placeholder="Nationality"
                        />
                        {errors.nationality && <span className="text-red-500">Please fill out this field.</span>}
                    </div>
                </div>
                <div className="md:col-span-2">
                    <div className="md:col-span-3">
                        <label htmlFor="phoneNumber">Contact Number</label>
                        <input
                            type="number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handler}
                            disabled={disabled}
                            id="phoneNumber"
                            className={errors.phoneNumber ? `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                            placeholder="Contact Number"

                        />
                        {errors.phoneNumber && <span className="text-red-500">Please fill out this field.</span>}
                    </div>
                    {skip ? '' : <div className="md:col-span-2">
                        <label htmlFor="bloodGroup">Blood Group</label>
                        <select
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={handler}
                            disabled={disabled}
                            id="bloodGroup"
                            className={errors.bloodGroup ? `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50 border-red-500` : `transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50`}
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="B+">B+</option>
                            <option value="A-">A-</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodGroup && <span className="text-red-500">Please fill out this field.</span>}
                    </div>
                    }
                </div>



            </div>
            <div className='md:col-span-2'>
                <div className="md:col-span-5 text-right">
                    {showButton ? <button disabled={disabled} type='submit' className={commonStyles.btnDark}>
                        Next
                    </button> : ""}
                </div>
            </div>
        </form>
    )
}

export default PersonalInfo
