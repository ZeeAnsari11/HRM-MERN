import { selectBackground, selectCurrentUser, selectOrgTheme } from '../../states/reducers/slices/backend/UserSlice';
import { selectNavState, selectWidth } from '../../states/reducers/slices/frontend/Navbar';

import MenuRenderer from './elements/Menu';
import { Menus } from './configuration';
import React from 'react';
import { base } from '../../api/configuration';
import { useSelector } from 'react-redux'

const Navbar = () => {
    let open = useSelector(selectNavState);
    let width = useSelector(selectWidth);
    const themeBack = useSelector(selectOrgTheme);
    let currentUser = useSelector(selectCurrentUser)
    const user = useSelector(selectCurrentUser).roleType;
    const tailwindStyleSheet = {
        mainContainer: `no-scrollbar h-full tablet:w-0 duration-300 fixed mobile:z-50 overflow-auto !bg-cover !bg-no-repeat !bg-center`,
        imgContainer: 'flex justify-center items-center shadow-lg',
        img: `cursor-pointer duration-500 px-5 h-24`,
        separaterLine: 'h-[1.5px] bg-gray-700 w-full',
        subMenuContainer: `space-y-2 ${!open && "px-0"} overflow-auto pb-5 relative`
    }
    const bgImage = useSelector(selectBackground)
    return (
        <div className={tailwindStyleSheet.mainContainer} style={{width: width, background: (bgImage === '') ? themeBack.primary : `url(${base}${bgImage})` ,}}>
            <div className={tailwindStyleSheet.imgContainer}>
                <img 
                src={`${base}${currentUser?.organization.logo}`}
                    className={tailwindStyleSheet.img} alt="company logo"
                />
            </div>
            <div className={tailwindStyleSheet.separaterLine}></div>
            <div className={tailwindStyleSheet.subMenuContainer}>
                {Menus.map((Menu, index) => {
                    if (Menu.access !== "Admin")
                        return <MenuRenderer key={index} menu={Menu} user={user}/>
                    else if (user == "admin") return <MenuRenderer key={index} user={user} menu={Menu} />
                })}
            </div>
        </div>
    )
}

export default Navbar;
