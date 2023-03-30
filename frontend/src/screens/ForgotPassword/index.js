import React from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {
    const navigation = useNavigate();
    return (
        <div className="flex justify-center items-center w-screen h-screen px-4 mobile:px-8 bg-lightBgColor">
            <div className="w-1/2 mobile:w-full tablet:w-3/4 p-5 pt-8 rounded-lg bg-white shadow-lg">
                <div className="px-8 tablet:px-2 mb-4 text-center">
                    <h3 className="pt-4 mb-2 text-2xl mobile:text-xl font-bold">Forgot Your Password?</h3>
                    <p className="mb-4 text-sm text-gray-700">
                        We get it, stuff happens. Just enter your email address below and we'll send you a
                        link to reset your password!
                    </p>
                </div>
                <form className="px-8 tablet:px-2 pt-6 pb-8 mb-4 rounded">
                    <div className="mb-4">
                        <label className="sr-only" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-3 text-sm leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter Email Address..."
                        />
                    </div>
                    <div className="mb-6 text-center">
                        <button
                            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Reset Password
                        </button>
                    </div>
                    <hr className="mb-6 border-t" />
                    <div className="text-center">
                        Already have an account?
                        <div className="inline-block cursor-pointer pl-2 text-sm text-blue-500 align-baseline hover:text-blue-800" onClick={() => navigation('/')}>
                             Login
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default ForgotPassword
