import React, { useState } from "react";

import Configuration from "../User/elements/Configuration";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/Modal";
import OrganizationInfo from "../User/elements/OrganizationInfo";
import PersonalInfo from "../User/elements/PersonalInfo";
import UserInfo from "../User/elements/UserInfo";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export default function EmployeeViewAndEdit({ data }) {
    const [formData, setFormData] = useState(data);
    const [pageNumber, setPageNumber] = useState(1);
    
    let trigger = false;

    const changePageNumber = () => {
        setPageNumber(pageNumber + 1);
    }
    
    const handleUpdateUser = () => {
        console.log("====trigger==",trigger);
      if(trigger){
        console.log("===caled===");
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
                    <PersonalInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} skip = {true} trigger={trigger}/>
                    <UserInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} trigger={trigger}/>
                    <OrganizationInfo formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false} skip = {true} trigger={trigger} />
                    <Configuration formData={formData} changePageNumber={changePageNumber} handleInputChange={handleInputChange} showButton={false}  trigger={trigger}/>
                </>
            }
            btnConfig={btnConfig}
            check={(closeModal) => {
            }
            } />
    </div>
}