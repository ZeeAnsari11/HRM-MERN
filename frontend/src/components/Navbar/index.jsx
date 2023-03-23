import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Menus } from './configuration';
import logo from '../../assets/logo-white.png';
import logoNoText from '../../assets/logo-no-text.png';

const Navbar = () => {
    const [open, setOpen] = React.useState(true);
    
    return (
        <div className="flex">
            <div className={` ${open ? "w-72" : "w-20"} bg-sideBarPrimaryColor h-screen p-5  pt-8 relative duration-300`}>
                <img
                    src={logo}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt="qwer"
                />
                <div className="flex gap-x-4 justify-center items-center">
                    <img src={open? logo : logoNoText}
                        className={`cursor-pointer duration-500`} alt="qwer"/>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li key={index} className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}>
                            <FontAwesomeIcon icon={Menu.font} color={'white'}/>
                            <p className={`${!open && "hidden"} text-white origin-left duration-200`}>
                                {Menu.title}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-screen flex-1 p-7">
                <h1 className="text-2xl font-semibold ">Home Page</h1>
            </div>
        </div>
    )
}

export default Navbar;
