import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

import Loader from '../../components/Loader';
import axios from 'axios';
import { commonStyles } from '../../styles/common';
import { toastMessage } from '../../AlertConfigs';
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const { token } = useParams();
    const [error, setError] = useState('')
    const [pswd, setPswd] = useState('')
    const [loader, setLoader] = useState(false)
    const [cpswd, setCPswd] = useState('');
    const handleResetPswdRequest = (e) => {
        e.preventDefault();
        if ((pswd === cpswd)) {
            if (pswd !== '' || cpswd !== '') {
                setLoader(true)
                setError('')
                axios.put(`http://127.0.0.1:4000/api/v1/password/reset/${token}`, 
                {
                    token,
                    comfirmpassword: cpswd,
                    password: pswd
                })
                .then((response) => {
                    toastMessage("success", response.data.message, toast)
                })
                .catch((error) => {
                    toastMessage("error", error.response.data.Message, toast)
                })
                .finally(() => {
                    setLoader(false)
                })
            }
            else {
                setError("Both passwords are required.")
                setLoader(false)
            }
        }
        else {
            setError("Both passwords does not match.")
            setLoader(false)
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
                            disabled={loader}
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
                            id="cpswd"
                            type="password"
                            placeholder="Confirm New Password..."
                            disabled={loader}
                        />
                    </div>
                    {(error !== '') && <p className={`${commonStyles.error} pb-6`}>{error}</p>}
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loader}
                        >
                            Reset Password {loader && <Loader color={'white'}/>}
                        </button>
                    </div>
                    <hr className="mb-6 border-t" />
                </form>
            </div>
            <ToastContainer />
        </div>

    )
}

export default ResetPassword
