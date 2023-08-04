import React, { useState } from 'react'

import axios from 'axios';
import { toast } from 'react-toastify';
import { toastMessage } from '../../AlertConfigs';
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams();
    const [pswd, setPswd] = useState('')
    const [cpswd, setCPswd] = useState('');
    const handleResetPswdRequest = (e) => {
        e.preventDefault();
        if (pswd === cpswd) {
            axios.put(`http://127.0.0.1:4000/api/v1/password/reset/${token}`, 
            {
                token,
                comfirmpassword: cpswd,
                password: pswd
            })
            .then((response) => {
                console.log(response);
                toastMessage("success", response.data.message, toast)
            })
            .catch((error) => {
                toastMessage("error", error.response.data.Message, toast)
            })
        }
    }
    return (
        <div className="flex justify-center items-center h-screen w-screen px-4 mobile:px-8 bg-lightBgColor">
            <div className="w-1/2 mobile:w-full tablet:w-3/4 p-5 pt-8 rounded-lg bg-white shadow-lg">
                <div className="px-8 tablet:px-2 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl mobile:text-xl font-bold">Reset Your Password?</h3>
                </div>
                <form onSubmit={handleResetPswdRequest} className="px-8 tablet:px-2 pt-6 pb-8 rounded">
                    <div className="mb-4">
                        <label className="sr-only" htmlFor="pswd">
                            New Password
                        </label>
                        <input
                            className="w-full p-3 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="pswd"
                            value={pswd}
                            onChange={(e) => setPswd(e.target.value)}
                            type="password"
                            placeholder="New Password..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="sr-only" htmlFor="pswd">
                            Confirm New Password
                        </label>
                        <input
                            value={cpswd}
                            onChange={(e) => setCPswd(e.target.value)}
                            className="w-full p-3 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="pswd"
                            type="password"
                            placeholder="Confirm New Password..."
                        />
                    </div>
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Reset Password
                        </button>
                    </div>
                    <hr className="mb-6 border-t" />
                </form>
            </div>
        </div>

    )
}

export default ResetPassword
