import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUser, selectOrgTheme } from '../../../states/reducers/slices/backend/UserSlice';
import { uploadFile, uploadLogoFile } from '../../../api/uploadImage';
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { base } from '../../../api/configuration';
import { commonStyles } from '../../../styles/common';
import { useRef } from "react";

const LogoSetting = () => {
    const inputRef = useRef(null);
    const dispatcher = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const theme = useSelector(selectOrgTheme);
    const imgUrl = `${base}${currentUser?.organization.logo}`
    const handleClick = () => {
        inputRef.current.click();
    };
    
    const handleFileChange = async (event) => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            return;
        }

        const formData = new FormData();
        formData.append('logo', fileObj);
        uploadLogoFile(formData, currentUser?.organization?._id, dispatcher);
    };
    return (
        <div className="bg-white my-3 w-full rounded shadow-lg p-4 px-4 mb-6 flex mobile:flex-col">
            <div className="w-1/2 p-4 mobile:w-full">
                <img
                    src={imgUrl}
                    alt="Logo"
                    className="w-full h-auto shadow-lg rounded-md" style={{backgroundColor: theme.primary}}
                />
            </div>

            <div className="w-1/2 p-4 flex justify-center mobile:w-full flex-col space-y-4 mobile:flex-row mobile:space-y-0 mobile:space-x-4">

                <button className={`${commonStyles.btnDark}`} onClick={handleClick}>
                    <FontAwesomeIcon  className='hover:text-gray-600 px-4' icon={faPencil} />
                    Upload
                    <input
                        type="file"
                        accept=".png"
                        onChange={handleFileChange}
                        ref={inputRef}
                        className="hidden"
                    />
                </button>
            </div>
        </div>
    );
};

export default LogoSetting;
