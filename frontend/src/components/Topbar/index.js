import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectNavState, setNavbarState } from '../../states/reducers/slices/frontend/Navbar';
import User from './elements/User';
import Notification from './elements/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faEnvelope, faExpand, faSearch } from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
    const dispatcher = useDispatch();
    let open = useSelector(selectNavState);
    const [fullScreen, setFullScreen] = React.useState(false);
    const tailwindStyle = {
        topBarContainer: `h-24 z-50 ${open ? 'left-[269px] tablet:left-0' : 'left-0'} border flex justify-between items-center fixed right-0 px-4 bg-white duration-300`,
        toglerContainer: 'flex justify-center items-center space-x-4',
        iconsContainer: 'p-3 bg-[#f1f4fb] rounded-lg hover:shadow-md cursor-pointer duration-200',
        textColor: 'text-gray-500'
    }
    const toggleFullScreen = () => {
        if (fullScreen === false) {
            document.documentElement.requestFullscreen();
            setFullScreen(true);
        }
        else {
            document.exitFullscreen();
            setFullScreen(false);
        }
    }
    return (
        <div className={tailwindStyle.topBarContainer}>
            <div className={tailwindStyle.toglerContainer}>
                <div className={tailwindStyle.iconsContainer}
                    onClick={() => dispatcher(setNavbarState(!open))}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon icon={faSearch}/>
                    </div>
                    <input type="text" className="bg-[#f1f4fb] text-gray-900 text-sm rounded-lg focus:ring-primaryColorLight block w-full pl-10 p-3.5" placeholder="Search Mockups, Logos, Design Templates..." required />
                </div>
            </div>
            <div className={tailwindStyle.toglerContainer}>
                <div className={tailwindStyle.iconsContainer} onClick={() => toggleFullScreen()}>
                <FontAwesomeIcon icon={faExpand}/>
                </div>
                <div className={tailwindStyle.iconsContainer}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <Notification styled={tailwindStyle}/>
                <User />
            </div>
        </div>
    )
}

export default Topbar
