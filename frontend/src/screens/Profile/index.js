import { selectCurrentUser, selectProfileCompletion } from "../../states/reducers/slices/backend/UserSlice";
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import Addresses from "./elements/Addresses";
import Certifications from "./elements/Certifications";
import ContactInfo from "./elements/ContactInfo";
import Experiences from "./elements/Experiences";
import OrganizationInfo from "./elements/OrganizationInfo";
import PersonalInfo from "./elements/PersonalInfo";
import Qualification from "./elements/Qualification";
import React, { useRef } from "react";
import RelativesForm from "./elements/RelativesForm";
import Skills from "./elements/Skills";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser);
  const profileCompletion = useSelector(selectProfileCompletion);
  const [showEditButton, setShowEditButton] = React.useState(false);
  const inputRef = useRef(null);

  const handleMouseEnter = () => {
    setShowEditButton(true);
  };

  const handleMouseLeave = () => {
    setShowEditButton(false);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
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
    <>
      <div className="flex justify-between flex-wrap p-4 h-26 border rounded-xl mobile:space-y-4">
        {/* <div className="flex items-center space-x-6 mobile:flex-col mobile:text-center mobile:space-y-4">
          <img className="w-24 h-24 rounded-xl" src="https://randomuser.me/api/portraits/men/2.jpg" alt="Avatar" />
          <div className="flex flex-col mobile:!ml-0">
            <span className="text-3xl text-gray-600 font-bold">{currentUser.firstName} {currentUser.lastName}</span>
            <span className="text-gray-600">
              {currentUser.designation?.title} @{currentUser.organization?.name}
            </span>
          </div>
        </div> */}
        <div className="flex items-center space-x-6 mobile:flex-col mobile:text-center mobile:space-y-4">
          <div className="flex flex-col mobile:!ml-0">
            <div
              className="relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className="w-28 h-28 rounded-xl"
                src="https://randomuser.me/api/portraits/men/2.jpg" // Replace with the actual image URL
                alt="dfghjk"
              />
              {showEditButton && (
                <button className=" absolute top-0 left-0 bg-gray-500 text-white px-2 py-1 rounded">
                  <FontAwesomeIcon onClick={handleClick} icon={faPencil} />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    ref={inputRef}
                    className="hidden"
                    // onChange={(e) => handleFileUpload(e)}
                  />
                </button>
              )}
            </div>
            <span className="text-3xl text-gray-600 font-bold">
              {currentUser.firstName} {currentUser.lastName}
            </span>
            <span className="text-gray-600">
              {currentUser.designation?.title} @{currentUser.organization?.name}
            </span>
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
            <div className="py-4 border rounded-xl" key={index}>
              {element?.Component}
            </div>
          )
        })}
      </div>
    </>
  );
};

export default UserProfile;