import { selectNavChildItem, selectNavItem, setChangeMenuChildState, setChangeMenuState } from '../../../states/reducers/slices/frontend/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
import React from 'react';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Menu = ({ menu }) => {
    const diapatcher = useDispatch();
    const selectedMenuItem = useSelector(selectNavItem)
    const selectedMenuChildItem = useSelector(selectNavChildItem)
    const [hoverEffect, setHoverEffect] = React.useState('text-lightText');
    return (
        <>
            <Link to={menu.to} onMouseOver={() => setHoverEffect('text-white')} onMouseOut={() => { setHoverEffect('text-lightText') }}
                className={`flex px-4 cursor-pointer items-center justify-between ${menu.gap ? "mt-9" : "mt-2"} rounded text-center px-2 py-1 hover:bg-gray-600 hover:shadow-md hover:text-lightText ${selectedMenuItem === menu.title ? 'bg-gray-600 text-lightText': ''}`}
                onClick={() => {
                    if (menu.title !== selectedMenuItem) diapatcher(setChangeMenuState(menu.title))
                }}>
                <div className={`flex py-1 text-gray-300 text-sm items-center gap-x-4`}>
                    <FontAwesomeIcon icon={menu.font} className={`${hoverEffect}`} width={'20'} />
                    <div className={`origin-left duration-300 font-semibold ${hoverEffect}`}>
                        {menu.title}
                    </div>
                </div>
                {(menu.child.length !== 0) ? <FontAwesomeIcon icon={faChevronDown} className={`duration-300 ${hoverEffect} ${(menu.title === selectedMenuItem) && 'rotate-180'}`} /> : null}
            </Link>
            <ul className={`px-6 space-y-2 relative !mt-0 left-0 w-full ${(menu.title === selectedMenuItem && menu.child.length !== 0) ? "max-h-[500px] opacity-100 py-4 bg-black" : "max-h-0 opacity-0 py-0"} overflow-hidden transition-max-height duration-300 ease-in-out`}>
                {menu.child.map((menuItem, index) => {
                        return <Link
                            className={`flex p-2 text-gray-300 text-sm items-center gap-x-4 hover:bg-gray-600 hover:shadow-md hover:text-lightText rounded-lg ${(menuItem.title === selectedMenuChildItem) ? 'bg-gray-600 text-lightText' : ''}`}
                            to={menuItem.to}  
                            key={index} 
                            onClick={() => {
                                if (menuItem.title !== selectedMenuChildItem) diapatcher(setChangeMenuChildState(menuItem.title))
                            }}>
                            <FontAwesomeIcon icon={menuItem.font} color={'white'} width={'20'} />
                            <div className={`origin-left duration-200 text-white`}>
                                {menuItem.title}
                            </div>
                        </Link>
                })}
            </ul>
        </>
    )
}

export default Menu
