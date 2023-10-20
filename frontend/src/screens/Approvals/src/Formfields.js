import React from "react";
import { selectUserLeaves } from "../../../states/reducers/slices/backend/LeaveRequest";
import { useSelector } from "react-redux";

const FormFields = ({ id }) => {
  const data = useSelector(selectUserLeaves);
  let wfh = null;

  let leave = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i]._id === id) {
      leave = data[i];
      break;
    }
  }

  console.log("Leave", leave);


  return (
    <div className="flex flex-col items-center justify-center">
        <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="fieldName" className=" block text-sm font-bold text-gray-700 mb-2">
                        Name
                    </label>
                    <div>
                    <input
                        type="text"
                        id="fieldValue"
                        value="Leave Type"
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
                        value={leave.leaveType.name}
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
                        value="Start Date"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="fieldName"
                        value={leave.startDate.substring(0,10)}
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
                        value="End Date"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="fieldName"
                        value={leave.endDate.substring(0,10)}
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
                        value="Date of Request"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="date"
                        id="fieldName"
                        value={leave.createdAt.substring(0, 10)}
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
                        value="Count"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="int"
                        id="fieldName"
                        value={leave.count}
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
                        value="Short"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="boolean"
                        id="fieldName"
                        value={leave.short}
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
                        value={leave.status}
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
                        value="Reason"
                        readOnly
                        className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        id="fieldName"
                        value={leave.reason}
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