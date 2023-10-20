import React, { useEffect, useState } from "react";
import { getLeaveRequestByOrganizationId, getShortLeaveTypesByOrganizationId } from "../../../api/leaverequest";
import { selectLeaveTypes, selectShortLeaveTypes, selectUserLeaves } from "../../../states/reducers/slices/backend/LeaveRequest";
import { selectOrgId, selectUID, setUpdatedLeave } from "../../../states/reducers/slices/backend/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const EditLeaves = ({ id }) => {
    const org_id = useSelector(selectOrgId);
    const user = useSelector(selectUID)
    const data = useSelector(selectUserLeaves);
    const leaveTypes = useSelector(selectLeaveTypes);
    const shortLeaveTypes = useSelector(selectShortLeaveTypes);
    const [short, setShort] = useState(false);
    const [leave, setLeave] = useState(null)

    useEffect(() => {
        getLeaveRequestByOrganizationId(org_id, dispatch);
        getShortLeaveTypesByOrganizationId(org_id, dispatch)
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === id) {
                const { startDate, endDate, reason, leaveType } = data[i];
                if (data[i].short) {
                    const { startTime, endTime , shortLeaveType, short} = data[i];
                    setLeave({ startDate, endDate, reason, leaveType: leaveType._id, short, startTime, shortLeaveType, endTime });
                    setShort(short)
                }
                else {
                    setLeave({ startDate, endDate, reason , leaveType: leaveType?._id });
                }
                break;
            }
        }
    }, []);

    useEffect(() => {
        dispatch(setUpdatedLeave(leave))
    }, [dispatch, leave]);

    const handleChangeStartDate = (e) => {
        setLeave({ ...leave, startDate: e.target.value });
    };
    

    const handleChangeEndDate = (e) => {
        setLeave({ ...leave, endDate: e.target.value });
    };

    const handleChangeReason = (e) => {
        setLeave({ ...leave, reason: e.target.value });

    };

    const handleChangeLeaveType = (e) => {
        setLeave({ ...leave, leaveType: e.target.value });

    };

    const handleChangeStartTime = (e) => {
        setLeave({ ...leave, startTime: e.target.value });
    };

    const handleChangeEndTime = (e) => {
        setLeave({ ...leave, endTime: e.target.value });
    };

    const setShortLeaveType = (e) => {
        setLeave({ ...leave, shortLeaveType: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-bold text-gray-700 mb-2">
                            Name
                        </label>
                        <div>
                            <input
                                type="text"
                                id="leaveType"
                                value="Leave Type"
                                readOnly
                                className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="leaveType" className="block text-sm font-bold text-gray-700 mb-2">
                            Value
                        </label>
                        <select
                            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="leave-type"
                            value={leave ? leave?.leaveType : ''}
                            onChange={handleChangeLeaveType}
                            required
                        >
                            <option value="">Select leave type</option>
                            {
                                leaveTypes.map((type) => {
                                    return <option value={type._id}>{type.name}</option>
                                })
                            }

                        </select>
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
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
                        <input
                            type="date"
                            id="startDateInput"
                            value={leave ? leave.startDate.substring(0, 10) : ''}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                            onChange={handleChangeStartDate}
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <input
                            type="text"
                            id="endDate"
                            value="End Date"
                            readOnly
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input
                            type="date"
                            id="endDateInput"
                            value={leave ? leave.endDate.substring(0, 10) : ''}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter field name"
                            required
                            onChange={handleChangeEndDate}
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2" htmlFor="short">
                        <input
                            className="mr-2 border border-backgroundDark leading-tight"
                            type="checkbox"
                            id="short"
                            checked={short}
                            onChange={(e) => {setShort(e.target.checked);  setLeave({ ...leave, short: e.target.checked })}}
                        />
                        <span className="text-sm font-medium">Short</span>
                    </label>
                </div>

                {short && (
                    <>
                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    id="shortLeaveType"
                                    value="Short Leave Type"
                                    readOnly
                                    className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <select
                                className="shadow appearance-none border-backgroundDark border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                                id="short-leave-type"
                                value={leave ? leave.shortLeaveType : ''}
                                onChange={setShortLeaveType}
                                required
                            >
                                <option value="">Short Leave Type</option>
                                {shortLeaveTypes.map((type) => (
                                    <option value={type._id} key={type._id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    id="startTime"
                                    value="Start Time"
                                    readOnly
                                    className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <input
                                className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                                id="start-time"
                                type="time"
                                value={leave ? leave.startTime : ''}
                                onChange={handleChangeStartTime}
                                required
                            />
                        </div>

                        <div className="mt-3 grid grid-cols-2 gap-4">
                            <div>
                                <input
                                    type="text"
                                    id="endTime"
                                    value="End Time"
                                    readOnly
                                    className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight bg-gray-100 focus:outline-none"
                                />
                            </div>
                            <input
                                className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                                id="end-time"
                                type="time"
                                value={leave ? leave.endTime : ''}
                                onChange={handleChangeEndTime}
                                required
                            />
                        </div>
                    </>
                )}

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
                            value={leave ? leave.reason : ''}
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

export default EditLeaves;
