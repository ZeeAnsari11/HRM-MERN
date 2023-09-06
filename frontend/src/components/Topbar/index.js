import { faBars, faExpand, faSearch } from '@fortawesome/free-solid-svg-icons';
import { selectNavState, setNavbarState } from '../../states/reducers/slices/frontend/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from './elements/Notification';
import React from 'react';
import User from './elements/User';

const Topbar = () => {
    const dispatcher = useDispatch();
    let open = useSelector(selectNavState);
    const [fullScreen, setFullScreen] = React.useState(false);
    const tailwindStyle = {
        topBarContainer: `h-24 z-50 ${open ? 'left-[269px] tablet:left-0' : 'left-0'} border flex justify-between items-center fixed right-0 px-4 bg-white duration-300`,
        toglerContainer: 'flex justify-center items-center space-x-4',
        iconsContainer: 'px-4 py-2 bg-[#f1f4fb] rounded-lg hover:shadow-md cursor-pointer duration-200',
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
            </div>
            <div className={tailwindStyle.toglerContainer}>
                <div className={tailwindStyle.iconsContainer} onClick={() => toggleFullScreen()}>
                <FontAwesomeIcon icon={faExpand}/>
                </div>
                <Notification styled={tailwindStyle}/>
                <User />
                <span title='This build does not represent the final version' className="bg-orange-100 animate-pulse text-orange-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-orange-200 dark:text-orange-900">beta</span>
            </div>
        </div>
    )
}

export default Topbar
