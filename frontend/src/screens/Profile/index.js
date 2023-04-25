import { faBuilding, faDriversLicense, faEnvelope, faIdBadge, faIdCard, faLocation, faMailBulk, faPassport, faPhoneSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, selectUID } from "../../states/reducers/slices/backend/UserSlice";
import { getCurrentUser } from "../../api/user";

const UserProfile = () => {
  const [loaded, setLoaded] = React.useState(true);
  const dispatcher = useDispatch();
  useEffect(() => {
    getCurrentUser( dispatcher, setLoaded);
  }, [])
  const currentUser = useSelector(selectCurrentUser)
  
  console.log(currentUser._id);
  if (loaded === true) return <h1>Loading</h1>
  return (
    <>
      <div className="flex justify-between p-4 h-26 border rounded-xl">
        <div className="flex items-center space-x-6">
          <img className="w-24 h-24 rounded-xl" src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" />
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

      <div className="flex w-full space-x-4 mt-4">
        <div className="py-4 flex-[0.5] border rounded-xl">
          <div className="border-l-8 border-backgroundDark font-bold text-lg">
            <h1 className="px-4 text-2xl">Personal Information</h1>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faIdCard} className="w-8 mr-2" />ID Card</div>
              <p className="px-10">{currentUser.nic.number}</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faPassport} className="w-8 mr-2" />Passport</div>
              <p className="px-10">{currentUser.passport.number}</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faDriversLicense} className="w-8 mr-2" />Driving Lisence</div>
              <p className="px-10">{currentUser.drivingLiscence.number}</p>
            </span>
          </div>
        </div>
        <div className="py-4 flex-[0.5] border rounded-xl">
          <div className="border-l-8 border-backgroundDark font-bold text-lg">
            <h1 className="px-4 text-2xl">Contact Information</h1>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faMailBulk} className="w-8 mr-2" />Official Email</div>
              <p className="px-10">{currentUser.email}</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faEnvelope} className="w-8 mr-2" />Personal Email</div>
              <p className="px-10">{currentUser.personalEmail}</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faPhoneSquare} className="w-8 mr-2" />Contact No.</div>
              <p className="px-10">{currentUser.phoneNumber ? currentUser.phoneNumber : 'Contact Number Empty'}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full space-x-4 mt-4">
      <div className="py-4 flex-1 border rounded-xl">
          <div className="border-l-8 border-backgroundDark font-bold text-lg">
            <h1 className="px-4 text-2xl">Organization Information</h1>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faIdBadge} className="w-8 mr-2" />User ID</div>
              <p className="px-10">{currentUser.organization.userCode.prefix}-{currentUser.userDefinedCode}</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Branch</div>
              <p className="px-10">{currentUser.branch.name} in {currentUser.branch.city}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 space-x-4 mt-4">
        <div className="py-4 flex-[0.5]     border rounded-xl">
          <div className="border-l-8 border-backgroundDark w-full font-bold text-lg">
            <h1 className="w-full px-4 text-2xl">Address</h1>
          </div>
          <div className="flex flex-col p-4 space-y-4">
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faBuilding} className="w-8 mr-2" />Permanant</div>
              <p className="px-10">34 N Franklin Ave Ste 687 #2146 Pinedale, Wyoming 82941, United States</p>
            </span>
            <span className="text-gray-600">
              <div className="text-lg font-semibold"><FontAwesomeIcon icon={faLocation} className="w-8 mr-2" />Temporary</div>
              <p className="px-10">654 street avenue, Wyoming 82941, United States</p>
            </span>
          </div>
        </div>

        <div className="py-4 flex-[0.5]     border rounded-xl">
          <div className="border-l-8 border-backgroundDark w-full font-bold text-lg">
            <h1 className="w-full px-4 text-2xl">Skills</h1>
          </div>
          <div className="flex flex-wrap -mx-2 px-10 py-4">
            {
              currentUser.skills.map((skill, index) => {
                return <div key={index} className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mr-2 mb-2">{skill}</div>
              })
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;