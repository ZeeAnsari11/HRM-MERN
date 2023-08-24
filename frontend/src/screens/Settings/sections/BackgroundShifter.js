import React, { useState } from 'react'

import Image from '../../../assets/image-default.png';
import { base } from '../../../api/configuration'
import { commonStyles } from '../../../styles/common'
import { setBackground } from '../../../states/reducers/slices/backend/UserSlice'
import { useDispatch } from 'react-redux'

const BackgroundShifter = ({imgAddresses=[], selectedBg=''}) => {
    const dispatcher = useDispatch();
    const [loader, setLoader] = useState(false);
    const handleSubmit = () => {
        setLoader(true)
    }
    return (
        <div className="bg-white my-3 w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-2">
                
                <div className="text-gray-600">
                    <p className="font-medium text-lg">Backgrounds</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {
                        imgAddresses.map((data) => {
                            return <div key={data} className={`${selectedBg === data ? 'outline outline-stone-900 opacity-100' : 'opacity-50'} cursor-pointer outline-gray-300 hover:opacity-100 hover:shadow-lg rounded-lg`}>
                                <img className="h-[120px] w-full object-cover rounded-lg" onClick={() => dispatcher(setBackground(data))} src={(data !== "default") ? `${base}${data}` : Image} alt="bg"/>
                            </div>
                        })
                    }
                </div>
            </div>
            <div className='text-right pt-6'>
                <button type='submit' onClick={handleSubmit} disabled={loader} className={`${commonStyles.btnDark} flex space-x-2`}>Save</button>
            </div>
        </div>
    )
}

export default BackgroundShifter
