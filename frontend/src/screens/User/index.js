import React, { useState } from "react";

import Forms from "./elements/Forms";
import Multistep from "./elements/Multistep";

const User = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = React.useState({
    nic: {
      number: ''
    },
    drivingLiscence: {
      number: ''
    },
    passport: {
      number: ''
    },
    roaster: {
      restDays: []
    },
    timeSlots: '',
  });
  const changePageNumber = () => {
    setPageNumber(pageNumber + 1);
  }
  const handleInputChange = ({ target: { name, value } }) => {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
  };

  return (
    <div className="p-6 mobile:p-0 flex justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="mobile:text-center mobile:py-4 font-semibold text-xl text-gray-600 mb-2">Create Employee Form</h2>
          <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="text-sm flex flex-col">
              <div className="text-gray-600 m-auto">
                <Multistep index={pageNumber} setIndex={setPageNumber} />
              </div>
              <Forms formNumber={pageNumber} changePageNumber={changePageNumber} formData={formData} handleInputChange={handleInputChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;