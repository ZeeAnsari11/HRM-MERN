import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { selectNavState, selectWidth } from '../../states/reducers/slices/frontend/Navbar';
import Skeleton from '../Skeleton';

const Dashboard = () => {
    let width = useSelector(selectWidth);
    let open = useSelector(selectNavState);
    return (
        <div className="flex w-screen h-screen">
            <Navbar />
            <Topbar />

            <div className="h-screen text-black p-7 relative top-[5rem] w-[calc(100%-269px)] duration-300" style={{left: width, width:(open)?'':'100vw'}}>
                <Skeleton />
            </div>
        </div>
    )
}

export default Dashboard
