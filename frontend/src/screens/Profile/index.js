import React, { useEffect, useRef } from "react";
import { selectCurrentUser, selectProfileCompletion } from "../../states/reducers/slices/backend/UserSlice";

import Addresses from "./elements/Addresses";
import Certifications from "./elements/Certifications";
import ContactInfo from "./elements/ContactInfo";
import Experiences from "./elements/Experiences";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OrganizationInfo from "./elements/OrganizationInfo";
import PersonalInfo from "./elements/PersonalInfo";
import Qualification from "./elements/Qualification";
import RelativesForm from "./elements/RelativesForm";
import Skills from "./elements/Skills";
import { base } from "../../api/configuration";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { getCurrentUser } from "../../api/user";
// import photo  from '../../../../backend/uploads/profile-1692196104362.jpg'
import { uploadFile } from "../../api/uploadImage";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const dispatcher = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const profileCompletion = useSelector(selectProfileCompletion);
  const [showEditButton, setShowEditButton] = React.useState(false);
  const [pic, setpic] = React.useState(currentUser?.profile);

  const inputRef = useRef(null);

  console.log("======={`${base}${pic}`}=======",`${base}${pic}`);
  const handleMouseEnter = () => {
    setShowEditButton(true);
  };

  const handleMouseLeave = () => {
    setShowEditButton(false);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    const formData = new FormData();
    formData.append('profile', fileObj);
    uploadFile(formData, currentUser._id, setpic, dispatcher);
  };

  const config = [
    { title: 'Personal Information', Component: <PersonalInfo data={currentUser} /> },
    { title: 'Contact Information', Component: <ContactInfo data={currentUser} /> },
    { title: 'Organization Information', Component: <OrganizationInfo data={currentUser} /> },
    { title: 'Address', Component: <Addresses data={currentUser} /> },
    { title: 'Skills', Component: <Skills data={currentUser} /> },
    { title: 'Relatives Information', Component: <RelativesForm userID={currentUser?._id} /> },
    { title: 'Certifications', Component: <Certifications userID={currentUser?._id} /> },
    { title: 'Experiences', Component: <Experiences userID={currentUser?._id} /> },
    { title: 'Qualifications', Component: <Qualification userID={currentUser?._id} /> },
  ]
  return (
    <div className="py-4">
      <div className="flex justify-between flex-wrap p-4 h-26 border rounded-xl mobile:space-y-4 bg-white shadow">
        <div className="flex items-center space-x-6 mobile:flex-col mobile:text-center mobile:space-y-4">
          <div className="flex flex-row space-x-6 mobile:!ml-0">
            <div
              className="relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="w-28 h-28 rounded-xl"
                src={`${base}${pic}`}
                alt="Profile Picture"
                loading="lazy"
              />
              {showEditButton && (
                <button className=" absolute top-0 left-0 bg-gray-500 text-white px-2 py-1 rounded">
                  <FontAwesomeIcon onClick={handleClick} icon={faPencil} />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={inputRef}
                    className="hidden"
                  />
                </button>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-3xl text-gray-600 font-bold">
                {currentUser.firstName} {currentUser.lastName}
              </span>
              <span className="text-gray-600">
                {currentUser.designation?.title} @{currentUser.organization?.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-[0.6] mobile:flex-1 justify-center">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium">Profile Complete</span>
            <span className="text-sm font-medium">{profileCompletion}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full delay-200 transition-all" style={{ width: `${profileCompletion}%` }}></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 tablet:grid-cols-1 w-full mt-4">
        {config.map((element, index) => {
          return (
            <div className="py-4 border rounded-xl bg-white shadow" key={index}>
              {element?.Component}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default UserProfile;