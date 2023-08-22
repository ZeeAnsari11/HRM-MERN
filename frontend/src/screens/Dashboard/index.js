import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { selectNavState, selectWidth, setChangeMenuChildState, setChangeMenuState } from '../../states/reducers/slices/frontend/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumbs from '../../components/BreadCrumb';
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
            navigation('/login');
        } else {
            const storedSelectedMenuItem = localStorage.getItem('selectedMenuItem');
            const storedSelectedMenuChildItem = localStorage.getItem('selectedMenuChildItem');
            if (storedSelectedMenuItem) {
                dispatcher(setChangeMenuState(storedSelectedMenuItem));
            }
            if (storedSelectedMenuChildItem) {
                dispatcher(setChangeMenuChildState(storedSelectedMenuChildItem));
            }
        }
    }, []);
    if (loaded === true) return <SceneLoader />
    return (
        <div className={`flex bg-gray-100 w-full h-full`}>
            <Navbar />
            <Topbar />
            <div className="max-h-[calc(100%-6rem)] py-4 text-black px-4 relative top-[5rem] w-[calc(100%-269px)] mobile:w-full z-40 duration-300" style={{left: (window.screen.width > 430) ? width : 0, width:(open)?'':'100vw'}}>
                {/* <BreadCrumbs data={['Dashboard']}/> */}
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard
