import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const NotFound = ({ element=null }) => {
    return (
        <section>
            <div className="py-8 px-4 flex justify-center items-center w-full h-[500px] lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <FontAwesomeIcon className='text-gray-500 text-7xl my-4' icon={faExclamationCircle}/>
                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-500 md:text-4xl">Nothing Found.</p>
                    <p className="mb-4 text-lg font-light text-gray-500">Looks like the collection is empty. {element !== null && "But don't worry you can create by tapping the below button"}</p>
                    {element}
                </div>
            </div>
        </section>
    )
}

export default NotFound
