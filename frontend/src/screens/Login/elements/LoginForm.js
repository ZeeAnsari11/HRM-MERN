import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import LoginOthers from './LoginOthers';

const LoginForm = ({showOtherLoginTypes}) => {
    return (
        <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcom Back!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
                </div>
                {showOtherLoginTypes && <LoginOthers />}
                <form className="mt-8 space-y-6">
                    <input type="hidden" name="remember" value="true" />
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Email" />
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faCode} />
                        </div>
                        <input type="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember_me" name="remember_me" type="checkbox"
                                className="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300" />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <div className="text-indigo-400 hover:text-blue-500">
                                Forgot your password?
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 px-4 py-2 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default LoginForm