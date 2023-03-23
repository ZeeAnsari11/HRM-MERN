import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const SubMenu = ({ menu, open }) => {
    const [toggle, setToggler] = React.useState(false);
    return (
        <>
        <div className={`${open && "flex flex-row justify-between items-center"} ${menu.gap ? "mt-9" : "mt-2"} rounded px-2 py-1 hover:bg-gray-600 hover:shadow-md`}>
            <li className={`flex ${!open && "flex-col py-4 space-y-2"} rounded-md p-1 cursor-pointer text-gray-300 text-sm items-center gap-x-4`}>
                <FontAwesomeIcon icon={menu.font} color={'white'} className={`${!open && "text-lg"}`} />
                <p className={`text-white origin-left duration-200`}>
                    {menu.title}
                </p>
            </li>
            {(menu.child.length !== 0 && open) ? <FontAwesomeIcon icon={faChevronDown} className={`${!open && "rotate-[180deg]"}`} color='white' onClick={() => setToggler(!toggle)}/> : null}
        </div>
        {
            toggle ? 
            <div className={`px-6 py-1 bg-gray-700 duration-300`}>
                {menu.child.map((menuItem) => {
                    return <li className={`flex ${!open && "flex-col py-4 space-y-2"} rounded-md p-1 cursor-pointer text-gray-300 text-sm items-center gap-x-4`}>
                        <FontAwesomeIcon icon={menu.font} color={'white'} className={`${!open && "text-lg"}`} />
                        <p className={`text-white origin-left duration-200`}>
                            {menuItem.title}
                        </p>
                    </li>
                })}
            </div> : null
        }
        </>
    )
}

export default SubMenu
