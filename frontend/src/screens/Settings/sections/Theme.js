import React, { useState } from 'react'
import { createTheme, updateTheme } from '../../../api/theme';
import { selectCurrentUserOrg, selectOrgTheme } from '../../../states/reducers/slices/backend/UserSlice';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../../../components/Loader';
import { commonStyles } from '../../../styles/common'

const Theme = () => {
    const themeBack = useSelector(selectOrgTheme);
    const currUserOrg = useSelector(selectCurrentUserOrg);
    const org_id = useSelector(selectCurrentUserOrg);
    const [themeType, setThemeType] = useState(themeBack);
    const [isValidColors, setIsValidColors] = useState({
        primary: true,
        secondary: true,
        dark_primary: true,
        dark_secondary: true,
    });
    console.log("adae", org_id)
    const [loader, setLoader] = useState(false)
    const dispatch = useDispatch();
    
    const handleInputChange = (event) => {
        setThemeType({...themeType, [event.target.name]: event.target.value})
        setIsValidColors((prevIsValidColors) => ({
            ...prevIsValidColors,
            [event.target.name]: event.target.value !== '' || /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(event.target.value),
        }));
    }
    
    const validateFields = () => {
        const validations = {
            primary: themeType.primary,
            secondary: themeType.secondary,
            dark_primary: themeType.dark_primary,
            dark_secondary: themeType.dark_secondary,
        };
        let allFieldsValid = true;
        for (const fieldName in validations) {
            const fieldValue = validations[fieldName];
            const isValidColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/i.test(fieldValue);

            if (!isValidColor) {
                allFieldsValid = false;
                setIsValidColors((prevIsValidColors) => ({
                    ...prevIsValidColors,
                    [fieldName]: false,
                }));
            }
        }
        return allFieldsValid;
    };
    const closeLoader = () => {
        setLoader(false)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true)
        if (validateFields()) {
            (org_id === undefined) ? createTheme({...themeType, organization: currUserOrg}, dispatch, closeLoader) : updateTheme(org_id, themeType, dispatch, closeLoader);   
        }
        else closeLoader()
    }
    
    return (
            <form onSubmit={handleSubmit} className="bg-white/50 backdrop-blur-sm my-3 w-full rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                    
                    <div className="text-gray-600">
                        <p className="font-medium text-lg">Theme Customization</p>
                    </div>
                    
                    <div className="lg:col-span-2">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">

                            <div className="md:col-span-5">
                                <label htmlFor="primary">Primary Color</label>
                                <div className='flex space-x-2'>
                                    <div className={`w-[38px] h-[38px] rounded`} style={{backgroundColor:themeType?.primary}}></div>
                                    <input disabled={loader} type="text" name="primary" id="primary" className={commonStyles.input} value={themeType.primary} onChange={handleInputChange}/>
                                </div>
                                {!isValidColors.primary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="secondary">Secondary Color</label>
                                <div className='flex space-x-2'>
                                    <div className={`w-[38px] h-[38px] rounded`} style={{backgroundColor:themeType?.secondary}}></div>
                                    <input disabled={loader} type="text" name="secondary" id="secondary" className={commonStyles.input} value={themeType.secondary} onChange={handleInputChange}/>
                                </div>

                                {!isValidColors.secondary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="dark_primary">Primary Color <span className={commonStyles.error}>(Primary Text Color)</span></label>
                                <div className='flex space-x-2'>
                                    <div className={`w-[38px] h-[38px] rounded`} style={{backgroundColor:themeType?.dark_primary}}></div>
                                    <input disabled={loader} type="text" name="dark_primary" id="dark_primary" className={commonStyles.input} value={themeType.dark_primary} onChange={handleInputChange}/>
                                </div>
                                {!isValidColors.dark_primary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                            <div className="md:col-span-5">
                                <label htmlFor="dark_secondary">Secondary Color <span className={commonStyles.error}>(Primary Text Color)</span></label>
                                <div className='flex space-x-2'>
                                    <div className={`w-[38px] h-[38px] rounded`} style={{backgroundColor:themeType?.dark_secondary}}></div>
                                    <input disabled={loader} type="text" name="dark_secondary" id="dark_secondary" className={commonStyles.input} value={themeType.dark_secondary} onChange={handleInputChange}/>
                                </div>
                                {!isValidColors.dark_secondary && <div className={commonStyles.error}>Invalid hex color format</div>}
                            </div>

                        </div>
                    </div>
                </div>
                <div className='text-right pt-6'>
                    <button type='submit' disabled={loader} className={`${commonStyles.btnDark} flex space-x-2`}>Save {loader && <Loader color={'white'}/>}</button>
                </div>
            </form>  
    )
}

export default Theme