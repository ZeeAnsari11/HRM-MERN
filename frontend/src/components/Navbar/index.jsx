import React from 'react';
import { Menus } from './configuration';
import logo from '../../assets/logo-white.png';
import logoNoText from '../../assets/logo-no-text.png';
import SubMenu from './elements/SubMenu';

const Navbar = () => {
    const [open, setOpen] = React.useState(true);
    
    return (
            <div className={` ${open ? "w-72" : "w-28"} bg-sideBarPrimaryColor h-screen relative duration-300`}>
                <div className="flex flex-col gap-x-4 justify-center items-center">
                    <img src={open? logo : logoNoText}
                        onClick={() => setOpen(!open)}
                        className={`cursor-pointer duration-500 px-5`} alt="company logo"
                    />
                    <div className='h-[1.5px] bg-gray-700 w-full'></div>
                </div>
                <ul className={`px-5 ${!open && "px-0"}`}>
                    {Menus.map((Menu, index) => {
                        return <SubMenu menu={Menu} key={index} open={open}/>
                    })}
                </ul>
            </div>
    )
}

export default Navbar;
