import React, { useState } from "react";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import Configuration from "../User/elements/Configuration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import OrganizationInfo from "../User/elements/OrganizationInfo";
import PersonalInfo from "../User/elements/PersonalInfo";
import UserInfo from "../User/elements/UserInfo";
import { updateUserById } from "../../api/user";

export default function EmployeeViewAndEdit({ data }) {
    const [formData, setFormData] = useState(data);
    const [pageNumber, setPageNumber] = useState(1);
    const [validator, setValidator] = useState(true);
    let trigger = false;

    const changePageNumber = () => {
        setPageNumber(pageNumber + 1);
    }

    const handleUpdateUser = (trigger) => {
        updateUserById(data.id, formData, trigger);
    }

    const handleAction = ({id, isLineManager, isHOD})=>{
        if(!isLineManager && !isHOD){
            
        }
    }
    const btnConfig = [
        {
            title: 'Update',
            handler: handleUpdateUser,
        }
    ]

    const handleInputChange = ({ target: { name, value } }) => {
        if (name === "roaster") {
            setFormData((formData) => ({
                ...formData,
                roaster: { ...formData.roaster, ...value },
            }));
        } else if (name === "timeslots") {
            setFormData((formData) => ({
                ...formData,
                userRoster: { ...formData.userRoster, "timeslots": value },
            }));
        } else {
            setFormData((formData) => ({
                ...formData,
                [name]: value,
            }));
        }
    };
    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={"View Employee"}
            Element={
                <>
                    <PersonalInfo isValid={setValidator} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} skip={true} trigger={trigger} />
                    <UserInfo isValid={setValidator} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} trigger={trigger} />
                    <OrganizationInfo isValid={setValidator} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} skip={true} trigger={trigger} />
                    <Configuration isValid={setValidator} formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} trigger={trigger} />
                </>
            }
            btnConfig={btnConfig}
            check={(closeModal) => {
                closeModal();
            }
            } />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}