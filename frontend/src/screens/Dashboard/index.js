import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { selectNavState, selectWidth, setIsMenuOpen } from '../../states/reducers/slices/frontend/Navbar';
import { logout } from '../../api/user';
import { Outlet, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatcher = useDispatch();
    const navigation = useNavigate();
    let width = useSelector(selectWidth);
    let open = useSelector(selectNavState);

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigation('/');
        }
    })

    return (
        <div className="flex w-screen h-screen">
            <Navbar />
            <Topbar />
            {/* <button onClick={() => logout(dispatcher, navigation)}>log out</button> */}
            <div className="z-[-1] h-screen text-black p-7 relative top-[5rem] w-[calc(100%-269px)] duration-300" style={{left: width, width:(open)?'':'100vw'}}>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
