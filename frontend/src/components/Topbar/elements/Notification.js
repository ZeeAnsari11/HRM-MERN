import React from 'react'
import Logo from '../../../assets/default-avatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectMenuOpen, setTogglers } from '../../../states/reducers/slices/frontend/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faXmark } from '@fortawesome/free-solid-svg-icons';

const Notification = ({ styled }) => {
    const key = 'notification';
    const dispatcher = useDispatch();
    let isMenuOpen = useSelector(selectMenuOpen);
    return (
        <div className={styled.iconsContainer} onClick={() => dispatcher(setTogglers(key))}>
            <FontAwesomeIcon className={styled.textColor} icon={faBell}/>
            <div style={{ maxWidth: (isMenuOpen[key]) ? '400px' : '0' }} className="overflow-hidden cursor-default duration-300 fixed z-50 right-0 top-0 h-screen bg-lightBgColor divide-y divide-gray-100 rounded-lg shadow-lg">
                <div className='p-4 w-full'><FontAwesomeIcon className='cursor-pointer' onClick={() => dispatcher(setTogglers(key))} icon={faXmark}/></div>
                <div className="divide-y divide-gray-100">
                    <div className="flex px-4 py-3 hover:bg-gray-100 cursor-pointer">
                        <div className="flex-shrink-0">
                            <img className="rounded-full w-11 h-11" src={Logo} alt="sample" />
                            <div className="absolute flex items-center justify-center w-5 h-5 ml-6 -mt-5 bg-blue-600 border border-white rounded-full">
                                <svg className="w-3 h-3 text-white" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path><path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path></svg>
                            </div>
                        </div>
                        <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5">New message from <span className="font-semibold text-gray-900">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
                            <div className="text-xs text-blue-600">a few moments ago</div>
                        </div>
                    </div>
                    <div className="block py-2 text-sm font-medium text-center text-gray-900 bg-gray-50 cursor-pointer hover:bg-gray-100">
                        <div className="inline-flex items-center ">
                            <svg className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                            View all
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    )
}

export default Notification
