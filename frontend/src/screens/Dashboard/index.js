import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { selectNavState, selectWidth } from '../../states/reducers/slices/frontend/Navbar';
import { getCurrentUser } from '../../api/user';
import { Outlet, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
    
    if (loaded === true) return <h1>Loading</h1>
    return (
        <div className={`flex`}>
            <Navbar />
            <Topbar />
            <div className="h-full text-black bg-gray-100 p-7 px-4 relative top-[5rem] w-[calc(100%-269px)] duration-300" style={{left: width, width:(open)?'':'100vw'}}>
                <Outlet />
            </div>
            <ToastContainer />
        </div>
    )
}

export default Dashboard
