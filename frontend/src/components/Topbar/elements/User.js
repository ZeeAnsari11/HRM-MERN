// import { selectMenuOpen, setTogglers } from '../../../states/reducers/slices/frontend/Navbar';
// import { useDispatch, useSelector } from 'react-redux';

// import Logo from '../../../assets/default-avatar.png';
// import React from 'react'
// import { logout } from '../../../api/user';
// import { selectCurrentUser } from '../../../states/reducers/slices/backend/UserSlice';
// import { useNavigate } from 'react-router-dom';

// const User = () => {
//     const key = 'user';
//     const dispatcher = useDispatch();
//     const navigation = useNavigate();
//     const {firstName, lastName, email} = useSelector(selectCurrentUser);
    
//     let isMenuOpen = useSelector(selectMenuOpen);
//     return (
//         <div className='rounded-lg hover:shadow-lg cursor-pointer'>
//             <img src={Logo} className="rounded-md w-12" alt="avatar" onClick={() => dispatcher(setTogglers('user'))} />
//             <div style={{ maxHeight: (isMenuOpen[key]) ? '400px' : '0' }} className="overflow-hidden duration-300 absolute right-4 my-4 bg-white rounded-lg shadow-lg w-44">
//                 <div className="px-4 py-3 text-sm text-gray-900">
//                     <div>{firstName} {lastName}</div>
//                     <div className="font-medium truncate">{email}</div>
//                 </div>
//                 <hr></hr>
//                 <div className="py-2 cursor-pointer">
//                     <div onClick={() => logout(dispatcher, navigation)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default User

import React, { useEffect, useRef, useState } from 'react';
import { selectMenuOpen, setTogglers } from '../../../states/reducers/slices/frontend/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../../../assets/default-avatar.png';
import { logout } from '../../../api/user';
import { selectCurrentUser } from '../../../states/reducers/slices/backend/UserSlice';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const key = 'user';
    const dispatcher = useDispatch();
    const navigation = useNavigate();
    const { firstName, lastName, email } = useSelector(selectCurrentUser);
    const userRef = useRef();
    const [isOpen, setIsOpen] = useState(false); // Keep track of whether the component is open or closed

    let isMenuOpen = useSelector(selectMenuOpen);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && userRef.current && !userRef.current.contains(event.target)) {
                dispatcher(setTogglers('user'));
                setIsOpen(false); // Set isOpen to false when the component is closed
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dispatcher, isOpen]);

    const handleComponentClick = () => {
        dispatcher(setTogglers('user'));
        setIsOpen(!isOpen); // Toggle isOpen when the component is clicked
    };

    return (
        <div ref={userRef} className='rounded-lg hover:shadow-lg cursor-pointer'>
            <img src={Logo} className="rounded-md w-12" alt="avatar" onClick={handleComponentClick} />
            <div style={{ maxHeight: (isMenuOpen[key]) ? '400px' : '0' }} className="overflow-hidden duration-300 absolute right-4 my-4 bg-white rounded-lg shadow-lg w-44">
                <div className="px-4 py-3 text-sm text-gray-900">
                    <div>{firstName} {lastName}</div>
                    <div className="font-medium truncate">{email}</div>
                </div>
                <hr></hr>
                <div className="py-2 cursor-pointer">
                    <div onClick={() => logout(dispatcher, navigation)} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</div>
                </div>
            </div>
        </div>
    );
};

export default User;
