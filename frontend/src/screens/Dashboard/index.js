import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { selectNavState, selectWidth, setNavbarState } from '../../states/reducers/slices/frontend/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import Navbar from '../../components/Navbar';
import SceneLoader from '../../components/SceneLoader';
import { ToastContainer } from 'react-toastify';
import Topbar from '../../components/Topbar';
import { getCurrentUser } from '../../api/user';

const Dashboard = () => {
    const dispatcher = useDispatch();
    const navigation = useNavigate();
    let width = useSelector(selectWidth);
    let open = useSelector(selectNavState);
    const [loaded, setLoaded] = React.useState(true);
    useEffect(() => {
        getCurrentUser(dispatcher, setLoaded);
        if (!localStorage.getItem('authToken')) {
            navigation('/');
        }
    }, [])

    const bg = 'bg-[url(https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80)]'
    
    if (loaded === true) return <SceneLoader />
    return (
        <div className={`flex`}>
            <Navbar />
            <Topbar />
            <div className="h-full text-black bg-gray-100 p-6 px-4 relative top-[5rem] w-[calc(100%-269px)] mobile:w-full z-40 duration-300" style={{left: (window.screen.width > 430) ? width : 0, width:(open)?'':'100vw'}}>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard
