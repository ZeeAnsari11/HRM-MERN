import React, { useEffect, useState } from "react";
import { selectUserWfh, setUpdatedWfh } from "../../../states/reducers/slices/backend/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const EditWfh = ({ id }) => {
    const data = useSelector(selectUserWfh);
    const [wfh, setwfh] = useState({
        startDate: '',
        endDate: '',
        reason: '',
    })

    const dispatch = useDispatch();

    useEffect(() => {
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === id) {
                const { startDate, endDate, reason } = data[i];
                setwfh({ startDate, endDate, reason });
                break;
            }
        }
    }, [data, id]);

    useEffect(() => {
        dispatch(setUpdatedWfh(wfh))
    }, [dispatch, wfh]);

    const handleChangeStartDate = (e) => {
        setwfh({ ...wfh, startDate: e.target.value });
    };

    const handleChangeEndDate = (e) => {
        setwfh({ ...wfh, endDate: e.target.value });
    };

    const handleChangeReason = (e) => {
        setwfh({ ...wfh, reason: e.target.value });

    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="startDate" className="block text-sm font-bold text-gray-700 mb-2">
                            Name
                        </label>
                        <div>
                            <input
                                type="text"
                                id="startDate"
                                value="Start Date"
                                readOnly
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="startDateInput" className="block text-sm font-bold text-gray-700 mb-2">
                            Value
                        </label>
                        <input
                            type="date"
                            id="startDateInput"
                            value={wfh ? wfh.startDate.substring(0, 10) : ''}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                            onChange={handleChangeStartDate}
                        />
                    </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <div>
                            <input
                                type="text"
                                id="endDate"
                                value="End Date"
                                readOnly
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="date"
                            id="endDateInput"
                            value={wfh ? wfh.endDate.substring(0, 10) : ''}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                            onChange={handleChangeEndDate}
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <div>
                            <input
                                type="text"
                                id="reason"
                                value="Reason"
                                readOnly
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <input
                            type="text"
                            id="reasonInput"
                            value={wfh ? wfh.reason : ''}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                            onChange={handleChangeReason}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditWfh;
