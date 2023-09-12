// import { Popover, Transition } from '@headlessui/react'
// import {
//   selectMenuOpen,
//   setTogglers,
// } from "../../../states/reducers/slices/frontend/Navbar";
// import { useDispatch, useSelector } from "react-redux";

// import { ChevronDownIcon } from '@heroicons/react/solid';
// import Logo from "../../../assets/default-avatar.png";
// import React from "react";
// import { logout } from "../../../api/user";
// import { selectCurrentUser } from "../../../states/reducers/slices/backend/UserSlice";
// import { useNavigate } from "react-router-dom";

// const User = () => {
//   const key = "user";
//   const dispatcher = useDispatch();
//   const navigation = useNavigate();
//   const { firstName, lastName, email } = useSelector(selectCurrentUser);

//   let isMenuOpen = useSelector(selectMenuOpen);
//   return (
//     <div className="rounded-lg hover:shadow-lg cursor-pointer">
//       <Popover className="relative">
//         {({ open }) => (
//           <>
//             <div className="rounded-lg hover:shadow-lg cursor-pointer">

//               <Popover.Button
//                 className={`
//                 ${open ? '' : 'text-opacity-90'}
//                 `}
//               >
//                 <img
//                   src={Logo}
//                   className="rounded-md w-12"
//                   alt="avatar"
//                   onClick={() => dispatcher(setTogglers("user"))}
//                 />
//               </Popover.Button>
//                 <div
//                       style={{ maxHeight: isMenuOpen[key] ? "400px" : "0" }}
//                       className="overflow-hidden duration-300 absolute right-4 my-4 bg-white rounded-lg shadow-lg w-44"
//                     >

//                       <div className="px-4 py-3 text-sm text-gray-900">
//                         <div>
//                           {firstName} {lastName}
//                         </div>
//                         <div className="font-medium truncate">{email}</div>
//                       </div>
//                       <hr></hr>
//                       <div className="py-2 cursor-pointer">
//                         <div
//                           onClick={() => {
//                             logout(dispatcher, navigation);
//                           }}
//                           className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Logout
//                         </div>
//                       </div>
//                     </div>
                 
//             </div>
//           </>
//         )}
//       </Popover>
//     </div>
//   );
// };

// export default User;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react"; // Import useState, useEffect, and useRef

import Logo from "../../../assets/default-avatar.png";
import { logout } from "../../../api/user";
import { selectCurrentUser } from "../../../states/reducers/slices/backend/UserSlice";
import { useNavigate } from "react-router-dom";

const User = () => {
  const key = "user";
  const dispatcher = useDispatch();
  const navigation = useNavigate();
  const { firstName, lastName, email } = useSelector(selectCurrentUser);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    // Add a click event listener to the document to detect clicks outside the popover
    const handleDocumentClick = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        // Clicked outside the popover, so close it
        setIsMenuOpen(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleDocumentClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <div className="rounded-lg hover:shadow-lg cursor-pointer">
      <div className="relative">
        <div className="rounded-lg hover:shadow-lg cursor-pointer">
          <img
            src={Logo}
            className="rounded-md w-12"
            alt="avatar"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          {isMenuOpen && (
            <div
              style={{ maxHeight: isMenuOpen ? "400px" : "0" }}
              className="overflow-hidden duration-300 absolute right-4 my-4 bg-white rounded-lg shadow-lg w-44"
              ref={popoverRef}
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>
                  {firstName} {lastName}
                </div>
                <div className="font-medium truncate">{email}</div>
              </div>
              <hr></hr>
              <div className="py-2 cursor-pointer">
                <div
                  onClick={() => {
                    logout(dispatcher, navigation);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
