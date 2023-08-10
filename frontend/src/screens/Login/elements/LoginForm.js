import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer, toast } from 'react-toastify';
import { faCode, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../../../components/Loader';
import LoginOthers from './LoginOthers';
import React from 'react';
import { commonStyles } from '../../../styles/common';
import {loginAuth} from '../../../api/user';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({showOtherLoginTypes}) => {
    const dispatcher = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState({
        email: '',
        password: ''
    });
    const [password, setPassword] = React.useState('');
    const navigation = useNavigate();
    
    const validate = () => {
        let newError = {};
    
        if (email === '') {
            newError.email = 'Email is required';
        }
        if (password === '') {
            newError.password = 'Password is required';
        } 
        if (password.length <= 8) {
            newError.password = 'Please enter a password having at least 9 characters';
        }
            
        setError(newError);
        
        return Object.entries(newError).length === 0
    };
    
    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(validate())
        if (validate()) {
            loginAuth(dispatcher, { email:email.toLowerCase(), password }, navigation, toast, setLoading)
        }
        else {
            setLoading(false)
        }
        
    }

    return (
        <>
        <div className="flex items-center justify-center w-full md:w-auto h-full xl:w-2/5 p-8 md:px-6 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-gray-900">
                        Welcome Back!
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">Please sign in to your account</p>
                </div>
                {showOtherLoginTypes && <LoginOthers />}
                <form onSubmit={handleLogin} className="mt-8 space-y-4">
                    <input type="hidden" name="remember" value="true" />
                    <div className="relative">
                        <div className="absolute top-[14px] left-0 flex items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <input disabled={loading} type="email" onChange={(e) => {
                                validate()
                                setEmail(e.target.value)
                            }} className="disabled:cursor-not-allowed bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Email"/>
                        {(error.email !== '') && <p className={commonStyles.error}>{error.email}</p>}
                    </div>
                    <div className="relative">
                        <div className="absolute h-[43px] inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon icon={faCode} />
                        </div>
                        <input disabled={loading} type={showPassword?"text":"password"} onChange={(e) => {
                                validate()
                                setPassword(e.target.value)
                            }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Password"/>
                        {(error.password !== '') && <p className={commonStyles.error}>{error.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input disabled={loading} onChange={() => {
                                setShowPassword(!showPassword)
                            }} id="remember_me" name="remember_me" type="checkbox" value={showPassword}
                                className="disabled:cursor-not-allowed h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300" />
                            <label htmlFor="remember_me" className="disabled:cursor-not-allowed ml-2 block text-sm text-gray-900">
                                Show Password
                            </label>
                        </div>
                        <div className="text-sm">
                            <div className="text-indigo-400 hover:text-blue-500"
                                 onClick={() => navigation('/forgot-password')}>
                                 Forgot your password?
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="submit" disabled={loading}
                            className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 px-4 py-2 rounded-lg tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500">
                            Sign in {(loading===true) ? <Loader color={'white'}/> : ""}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <ToastContainer/>
        </>
    )
}

export default LoginForm