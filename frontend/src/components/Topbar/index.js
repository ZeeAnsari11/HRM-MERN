import { faBarChart, faSquareCaretRight, faEnvelope, faMoon, faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux'
import { selectWidth } from '../../states/reducers/slices/frontend/Navbar'

const Topbar = () => {
    const width = useSelector(selectWidth);
    return (
        <div className={`flex justify-between items-center fixed right-0 w-[calc(100%-${width})] h-20 p-4 bg-white duration-300`}>
            <div>
                <div>
                    <FontAwesomeIcon icon={faBarChart} />
                </div>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="voice-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                    <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg aria-hidden="true" className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-center space-x-4'>
                <div className='p-3 bg-[#f1f4fb] rounded-lg'>
                    <FontAwesomeIcon icon={faMoon} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faSquareCaretRight} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                    <FontAwesomeIcon icon={faUser} />
                </div>
            </div>
        </div>
    )
}

export default Topbar
