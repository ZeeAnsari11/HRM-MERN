import React from 'react'

const CUForm = ({ config, handleInputChange, isFull=true }) => {
    return <div className={isFull ? 'w-1/2' : 'w-full'}>
            {
                config.map((item, index) => {
                    if (item.type === 'checkbox') {
                        return <div className="mb-4 flex items-center">
                            <input
                                className="border border-gray-300 rounded-md px-3 mr-2 py-2"
                                type="checkbox"
                                name={item?.name}
                                value={item.value}
                                onChange={handleInputChange}
                                required={item?.isRequired}
                            />
                            <p className='block text-sm font-bold mb-1'>{item?.label}</p>
                        </div>
                    }
                    return <div key={index} className="mb-4">
                        <label className="block text-sm font-bold mb-1">{item?.label}</label>
                        <input
                            placeholder={item?.placeholder}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            type={item.type}
                            name={item?.name}
                            pattern={item?.pattern}
                            value={item.value}
                            onChange={item.onChange}
                            required={item?.isRequired}
                        />
                    </div>
                })
            }
        </div>
    
}

export default CUForm
