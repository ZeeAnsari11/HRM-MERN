import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Menu = ({ menu, open }) => {
    const [toggle, setToggler] = React.useState(false);
    const [hoverEffect, setHoverEffect] = React.useState('text-lightText');
    return (
        <>
        <div onMouseOver={() => setHoverEffect('text-white')} onMouseOut={() => {setHoverEffect('text-lightText')}} 
            className={`${open && "flex flex-row justify-between items-center cursor-pointer"} ${menu.gap ? "mt-9" : "mt-2"} rounded text-center px-2 py-1 hover:bg-gray-600 hover:shadow-md`}>
            <div className={`flex ${!open && "flex-col space-y-2"} rounded-md p-1 text-gray-300 text-sm items-center gap-x-4`}>
                <FontAwesomeIcon icon={menu.font} className={`${hoverEffect}`} width={'20'}/>
                <p className={`origin-left duration-300 font-semibold ${hoverEffect}`}>
                    {menu.title}
                </p>
            </div>
            {(menu.child.length !== 0 && open) ? <FontAwesomeIcon icon={faChevronDown} className={`cursor-pointer duration-300 ${hoverEffect} ${toggle && 'rotate-180'}`} onClick={() => setToggler(!toggle)}/> : null}
        </div>
            <ul className={`px-6 space-y-2 py-1 relative left-0 w-full ${toggle?"max-h-[500px]":"max-h-0"} overflow-hidden rounded-md transition-max-height duration-300 ease-in-out`}>
                {menu.child.map((menuItem) => {
                    return <li className={`flex ${!open && "flex-col py-4 space-y-2"} rounded-md p-1 cursor-pointer text-gray-300 text-sm items-center gap-x-4`}>
                        <FontAwesomeIcon icon={menuItem.font} color={'white'} className={`${!open && "text-lg"}`} width={'20'}/>
                        <p className={`origin-left duration-200 ${hoverEffect}`}>
                            {menuItem.title}
                        </p>
                    </li>
                })}
            </ul>
        </>
    )
}

export default Menu
