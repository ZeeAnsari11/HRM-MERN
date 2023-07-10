import React, { useEffect } from 'react'
import Content from './elements/Content';
import LoginForm from './elements/LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    useEffect(() => {
        const authorized = localStorage.getItem('authToken');
        console.log(authorized)
        if (authorized) navigate('/dashboard');
    })
    return (<div className="relative min-h-screen flex">
        <div className="w-screen flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
            <Content />
            <LoginForm/>
        </div>
    </div>
    )
}

export default Login