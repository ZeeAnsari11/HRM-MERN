import React from 'react'
import Success from './Success'

const Multistep = ({index, setIndex}) => {
    return (
        <ol className="flex text-gray-500">
            <li className="mb-10 ml-6">
                <span onClick={() => setIndex(1)} className={` flex items-center justify-center w-8 h-8 ${(index > 1)?'bg-green-200 text-green-500':null} bg-gray-100 rounded-full -left-4 ring-4 ring-white`}>
                    {
                        (index === 1) ? <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>:<Success />
                    }
                </span>
                <h3 className="font-bold leading-tight">Personal Info</h3>
                <p className="text-sm">Step details here</p>
            </li>
            <li className="mb-10 ml-6">
                <span onClick={() => setIndex(index>=2 ? 2 : index)} className={` flex items-center justify-center w-8 h-8 ${(index > 2)?'bg-green-200 text-green-500':null} bg-gray-100 rounded-full -left-4 ring-4 ring-white`}>
                    {
                        (index <= 2) ?                     
                        <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                            clipRule="evenodd"
                        />
                    </svg> : <Success />
                    }
                </span>
                <h3 className="font-bold leading-tight">Organization Info</h3>
                <p className="text-sm">Step details here</p>
            </li>
            <li className="mb-10 ml-6">
                <span onClick={() => setIndex(index>=3 ? 3 : index)} className={` flex items-center justify-center w-8 h-8 ${(index > 3)?'bg-green-200 text-green-500':null} bg-gray-100 rounded-full -left-4 ring-4 ring-white`}>
                    {
                        (index <= 3) ? <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path
                                fillRule="evenodd"
                                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                clipRule="evenodd"
                            />
                        </svg> : <Success />
                    }
                </span>
                <h3 className="font-medium leading-tight">Confirguration</h3>
                <p className="text-sm">Step details here</p>
            </li>
            <li className="ml-6">
                <span className=" flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -left-4 ring-4 ring-white">
                    <svg
                        aria-hidden="true"
                        className="w-6 h-6 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                            fillRule="evenodd"
                            d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                </span>
                <h3 className="font-medium leading-tight">Confirmation</h3>
                <p className="text-sm">Step details here</p>
            </li>
        </ol>
    )
}

export default Multistep