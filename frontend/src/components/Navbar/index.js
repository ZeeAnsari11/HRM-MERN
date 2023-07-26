import { selectNavState, selectWidth } from '../../states/reducers/slices/frontend/Navbar';

import MenuRenderer from './elements/Menu';
import { Menus } from './configuration';
import React from 'react';
import logo from '../../assets/logo-white.png';
import logoNoText from '../../assets/logo-no-text.png';
import {useSelector} from 'react-redux'

const Navbar = () => {
    let open = useSelector(selectNavState);
    let width = useSelector(selectWidth);
    const tailwindStyleSheet = {
        mainContainer: `bg-primaryColorLight h-full tablet:w-0 min-h-screen duration-300 fixed mobile:z-50 overflow-auto`,
        imgContainer: 'flex justify-center items-center shadow-lg',
        img: `cursor-pointer duration-500 px-5 h-24`,
        separaterLine: 'h-[1.5px] bg-gray-700 w-full',
        subMenuContainer: `space-y-2 ${!open && "px-0"} overflow-auto pb-5 relative`
    }
    return (
        <div className={tailwindStyleSheet.mainContainer} style={{width: width}}>
            <div className={tailwindStyleSheet.imgContainer}>
                <img src={open ? logo : logoNoText}
                    className={tailwindStyleSheet.img} alt="company logo"
                />
            </div>
            <div className={tailwindStyleSheet.separaterLine}></div>
            <div className={tailwindStyleSheet.subMenuContainer}>
                {Menus.map((Menu, index) => {
                    //if (Menu.access !== "admin")
                        return <MenuRenderer key={index} menu={Menu} />
                })}
            </div>
        </div>
    )
}

export default Navbar;
