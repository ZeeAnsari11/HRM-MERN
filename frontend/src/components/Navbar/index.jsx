import React from 'react';
import { Menus } from './configuration';
import logo from '../../assets/logo-white.png';
import logoNoText from '../../assets/logo-no-text.png';
import MenuRenderer from './elements/Menu';
import { selectNavState, selectWidth, setNavbarState } from '../../states/reducers/slices/frontend/Navbar';
import {useSelector, useDispatch} from 'react-redux'

const Navbar = () => {
    const dispatcher = useDispatch();
    const open = useSelector(selectNavState);
    const width = useSelector(selectWidth);
    const tailwindStyleSheet = {
        mainContainer: `bg-primaryColorLight w-[${width}] h-full min-h-screen duration-300 fixed overflow-auto`,
        imgContainer: 'flex justify-center items-center shadow-lg',
        img: `cursor-pointer duration-500 px-5 h-24`,
        separaterLine: 'h-[1.5px] bg-gray-700 w-full',
        subMenuContainer: `px-5 ${!open && "px-0"} overflow-auto pb-5 relative`
    }
    return (
        <div className={tailwindStyleSheet.mainContainer}>
            <div className={tailwindStyleSheet.imgContainer}>
                <img src={open ? logo : logoNoText}
                    onClick={() => dispatcher(setNavbarState(!open))}
                    className={tailwindStyleSheet.img} alt="company logo"
                />
            </div>
            <div className={tailwindStyleSheet.separaterLine}></div>
            <div className={tailwindStyleSheet.subMenuContainer}>
                {Menus.map((Menu, index) => {
                    return <MenuRenderer key={index} menu={Menu} open={open} />
                })}
            </div>
        </div>
    )
}

export default Navbar;
