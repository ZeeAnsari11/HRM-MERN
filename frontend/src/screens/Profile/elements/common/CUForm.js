import React from 'react'
import { commonStyles } from '../../../../styles/common';

const CUForm = ({ config, handleInputChange, isFull=true , validationErrors}) => {
    return <div className={isFull ? 'w-1/2 mobile:w-full' : 'w-full'}>
            
            {
                config.map((item, index) => {
                    if (item?.customElements) return <div key={index}>{item.customElements}</div>
                    else if (item.type === 'checkbox') {
                        return <div key={index}>
                        <div className="flex items-center">
                            <div>
                            <input
                                className="border border-gray-300 rounded-md px-3 mr-2 py-2"
                                type="checkbox"
                                name={item?.name}
                                checked={item.value}
                                onChange={handleInputChange}
                                required={item?.isRequired}
                            />
                            </div>
                            <p className='block text-sm font-bold mb-1'>{item?.label}</p>
                        </div>
                        {validationErrors && <p className={commonStyles?.error}>{item?.error?.message}</p>}
                        </div>
                    }
                    return <div key={index} className="mb-4">
                        <label className="block text-sm font-bold mb-1">{item?.label}</label>
                        <input
                            placeholder={item?.placeholder}
                            className={commonStyles.input}
                            type={item.type}
                            name={item?.name}
                            pattern={item?.pattern}
                            value={item.value}
                            onChange={item.onChange}
                            required={item?.isRequired}
                        />
                        {validationErrors && <p className={commonStyles.error}>{item?.error?.message}</p>}
                    </div>
                })
            }
        </div>
    
}

export default CUForm
