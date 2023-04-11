import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Menu = ({ menu }) => {
    const [toggle, setToggler] = React.useState(false);
    const [hoverEffect, setHoverEffect] = React.useState('text-lightText');
    return (
        <>
        <div onMouseOver={() => setHoverEffect('text-white')} onMouseOut={() => {setHoverEffect('text-lightText')}} 
            className={`flex items-center justify-between ${menu.gap ? "mt-9" : "mt-2"} rounded text-center px-2 py-1 hover:bg-gray-600 hover:shadow-md`}>
            <div className={`flex rounded-md p-1 text-gray-300 text-sm items-center gap-x-4`}>
                <FontAwesomeIcon icon={menu.font} className={`${hoverEffect}`} width={'20'}/>
                <Link to={menu.to} className={`origin-left duration-300 font-semibold ${hoverEffect}`}>
                    {menu.title}
                </Link>
            </div>
            {(menu.child.length !== 0) ? <FontAwesomeIcon icon={faChevronDown} className={`cursor-pointer duration-300 ${hoverEffect} ${toggle && 'rotate-180'}`} onClick={() => setToggler(!toggle)}/> : null}
        </div>
            <ul className={`px-6 space-y-2 py-1 relative left-0 w-full ${toggle?"max-h-[500px]":"max-h-0"} overflow-hidden rounded-md transition-max-height duration-300 ease-in-out`}>
                {menu.child.map((menuItem, index) => {
                    return <li key={index} className={`flex rounded-md p-1 cursor-pointer text-gray-300 text-sm items-center gap-x-4`}>
                        <FontAwesomeIcon icon={menuItem.font} color={'white'} width={'20'}/>
                        <Link to={menuItem.to} className={`origin-left duration-200 ${hoverEffect}`}>
                            {menuItem.title}
                        </Link>
                    </li>
                })}
            </ul>
        </>
    )
}

export default Menu
