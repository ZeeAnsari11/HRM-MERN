import React from 'react'
import Background from '../../../assets/background-sm.jpg';

const Content = () => {
    return (
        <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
            style={{ backgroundImage: `url(${Background})` }}>
            <div className="absolute bg-gradient-to-b from-primaryColorLight to-primaryColorDark opacity-75 inset-0 z-0"></div>
            <div className="w-full  max-w-md z-10">
                <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">Redefine Your
                    HR Potential </div>
                <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                We believe in hearing the voice of the business community. It is the reflection of your experiences and answers to your HR & Payroll related problems to help you scale at full potential.
                </div>
            </div>
        </div>
    )
}

export default Content