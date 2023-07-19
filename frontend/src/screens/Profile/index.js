import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../states/reducers/slices/backend/UserSlice";
import PersonalInfo from "./elements/PersonalInfo";
import ContactInfo from "./elements/ContactInfo";
import OrganizationInfo from "./elements/OrganizationInfo";
import Addresses from "./elements/Addresses";
import Skills from "./elements/Skills";
import RelativesForm from "./elements/RelativesForm";
import Qualification from "./elements/Qualification";
import Certifications from "./elements/Certifications";
import Experiences from "./elements/Experiences";

const UserProfile = () => {
  const currentUser = useSelector(selectCurrentUser);

  const config = [
    { title: 'Personal Information', Component: <PersonalInfo data={currentUser}/> },
    { title: 'Contact Information', Component: <ContactInfo data={currentUser}/> },
    { title: 'Organization Information', Component: <OrganizationInfo data={currentUser}/> },
    { title: 'Relatives Information', Component: <RelativesForm userID={currentUser?._id}/> },
    { title: 'Address', Component: <Addresses data={currentUser}/> },
    { title: 'Skills', Component: <Skills data={currentUser}/> },
    { title: 'Certifications', Component: <Certifications userID={currentUser?._id}/> },
    { title: 'Experiences', Component: <Experiences userID={currentUser?._id}/> },
    { title: 'Qualifications', Component: <Qualification userID={currentUser?._id}/> },
  ]
  return (
    <>
      <div className="flex justify-between flex-wrap p-4 h-26 border rounded-xl">
        <div className="flex items-center space-x-6">
          <img className="w-24 h-24 rounded-xl" src="https://randomuser.me/api/portraits/men/2.jpg" alt="Avatar" />
          <div className="flex flex-col">
            <span className="text-3xl text-gray-600 font-bold">{currentUser.firstName} {currentUser.lastName}</span>
            <span className="text-gray-600">
              {currentUser.designation.title} @{currentUser.organization.name}
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-[0.6] justify-center">
          <div className="flex justify-between mb-1">
            <span className="text-base font-medium">Profile Complete</span>
            <span className="text-sm font-medium">45%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1 w-full mt-4">
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