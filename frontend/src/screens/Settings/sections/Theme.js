import React, { useState } from 'react'

import { commonStyles } from '../../../styles/common'

const Theme = ({theme={}}) => {
    
    const [themeType, setThemeType] = useState(theme);
    const [isValidColors, setIsValidColors] = useState({
        primary: true,
        secondary: true,
        dark_primary: true,
        dark_secondary: true,
    });
    
    React.useEffect(() => {
        // TODO : API call for
    },[])
    
    const handleInputChange = (event) => {
        setThemeType({...themeType, [event.target.name]: event.target.value})
        setIsValidColors((prevIsValidColors) => ({
            ...prevIsValidColors,
            [event.target.name]: event.target.value !== '' || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(event.target.value),
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            console.log('Submit Success')    
        }
        else console.log('Submit Error')   
    }
    console.log(isValidColors)
    const validate = () => {
        let clrs = Object.keys(themeType).map((key) => {
            return {[key]:(themeType[key] !== '' || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(themeType[key]))}
        })
        // setIsValidColors({
        //     ...clrs
        // })
        // // TODO
        return Object.values(isValidColors).every((isValid) => isValid)
    }

    return (
            <form onSubmit={handleSubmit} className="bg-white my-3 w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Theme Customization</p>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                            <div className="md:col-span-5">
                                <label htmlFor="primary">Primary Color</label>
                                <input type="text" name="primary" id="primary" className={commonStyles.input} value={themeType.primary} onChange={handleInputChange}/>
                                {!isValidColors.primary && <div className={commonStyles.error}>Invalid hex color format</div>}

                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="secondary">Secondary Color</label>
                                <input type="text" name="secondary" id="secondary" className={commonStyles.input} value={themeType.secondary} onChange={handleInputChange}/>
                                {!isValidColors.secondary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="dark_primary">Primary Color <span className={commonStyles.error}>(Dark Theme)</span></label>
                                <input type="text" name="dark_primary" id="dark_primary" className={commonStyles.input} value={themeType.dark_primary} onChange={handleInputChange}/>
                                {!isValidColors.dark_primary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="dark_secondary">Secondary Color <span className={commonStyles.error}>(Dark Theme)</span></label>
                                <input type="text" name="dark_secondary" id="dark_secondary" className={commonStyles.input} value={themeType.dark_secondary} onChange={handleInputChange}/>
                                {!isValidColors.dark_secondary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='text-right pt-6'>
                    <button type='submit' className={commonStyles.btnDark}>Save</button>
                </div>
            </form>
    )
}

export default Theme