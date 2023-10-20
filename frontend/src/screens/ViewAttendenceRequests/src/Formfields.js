import React from "react";
import { useSelector } from "react-redux";
import { selectMissingPunches } from "../../../states/reducers/slices/backend/UserSlice";

const FormFields = ({ id }) => {
  const data = useSelector(selectMissingPunches);
 

  let attendance = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      attendance = data[i];
      break;
    }
  }


  return (
    <div className="flex flex-col items-center justify-center">
        <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fieldName" className=" block text-sm font-bold text-gray-700 mb-2">
                        Punch Type
                    </label>
                    <div>
                    <input
                        type="text"
                        id="fieldValue"
                        value="Punch Type"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                </div>
                <div>
                    <label htmlFor="fieldName" className="block text-sm font-bold text-gray-700 mb-2">
                        Value
                    </label>
                    <input
                        type="text"
                        id="fieldName"
                        value={attendance.punchType}
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter field name"
                        required
                    />
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        id="fieldValue"
                        value="Date of Creation"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="fieldName"
                        value={attendance.createdAt.substring(0,10)}
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter field name"
                        required
                    />
                </div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        id="fieldValue"
                        value="Expected Time"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="fieldName"
                        value={attendance.expectedTime}
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter field name"
                        required
                    />
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                    <input
                        type="text"
                        id="fieldValue"
                        value="Status"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="fieldName"
                        value={attendance.status}
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter field name"
                        required
                    />
                </div>
            </div>
        </form>
    </div>
);
};

export default FormFields;
