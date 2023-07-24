import React from "react";
import { useSelector } from "react-redux";
import { selectUserWfh } from "../../../states/reducers/slices/backend/UserSlice";
const FormFields = ({ id }) => {
    const data = useSelector(selectUserWfh)

    console.log("selectedId", id)

    let wfh = null;

    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === id) {
            wfh = data[i];
            break;
        }
    }
    console.log("wfh", wfh);

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
                            value="Start Date"
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
                            type="date"
                            id="fieldName"
                            value={wfh.startDate.substring(0,10)}
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
                            value={wfh.endDate.substring(0,10)}
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
                            value={wfh.createdAt.substring(0, 10)}
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
                            value={wfh.status}
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
                            value={wfh.reason}
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

export default FormFields