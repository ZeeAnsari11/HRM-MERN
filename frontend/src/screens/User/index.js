import React, { useState } from "react";

import Forms from "./elements/Forms";
import Multistep from "./elements/Multistep";

const User = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [formData, setFormData] = React.useState({});
  const changePageNumber = () => {
    setPageNumber(pageNumber + 1);
  }
  const handleInputChange = ({ target: { name, value } }) => {
    if (name === "roaster") {
      setFormData((formData) => ({
        ...formData,
        roaster: { ...formData.roaster, ...value },
      }));
    } else if (name === "timeslots") {
      setFormData((formData) => ({
        ...formData,
        userRoster: { ...formData.userRoster, timeslots: value },
      }));
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="min-h-screen p-6 flex justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <h2 className="font-semibold text-xl text-gray-600 mb-2">Create Employee Form</h2>
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