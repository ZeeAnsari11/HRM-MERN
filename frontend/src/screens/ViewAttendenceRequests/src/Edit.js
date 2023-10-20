import React, { useEffect, useState } from "react";

import { selectMissingPunches, selectUID, setupdatedAttendance, setUpdatedLeave } from "../../../states/reducers/slices/backend/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { getMissingPunchesRquestsOfUser } from "../../../api/missingPunchesRequests";

const Edit = ({ id }) => {
    const user = useSelector(selectUID)
    const [attendance, setAttendance] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        getMissingPunchesRquestsOfUser(user, dispatch)
    }, [user, dispatch]);

    const data = useSelector(selectMissingPunches)
    console.log("Attendance", attendance);

    useEffect(() => { 
        for (let i = 0; i < data.length; i++) {
            if (data[i]._id === id) {
                const { date, punchType, expectedTime } = data[i];
                setAttendance({
                    date,
                    punchType,
                    expectedTime,
                });
            }
        }
    }, [data, id]);

    

    useEffect(() => {
        dispatch(setupdatedAttendance(attendance))
    }, [dispatch, attendance]);

    const handleChangePunchDate = (e) => {
        setAttendance({ ...attendance, date: e.target.value });
    };

    const punchTypeOptions = ["CheckIn", "checkOut"];
  
    const handleChangePunchType = (e) => {
        setAttendance({ ...attendance, punchType: e.target.value });
    };

    const handleChangePunchTime = (e) => {
        setAttendance({ ...attendance, expectedTime: e.target.value });
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <form className="w-full max-w-md bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="punchType" className="block text-sm font-bold text-gray-700 mb-2">
                            Punch Type
                        </label>
                        <select
                            className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                            id="punch-type"
                            value={attendance ? attendance.punchType.substring(0,10) : ""}
                            onChange={handleChangePunchType}
                            required
                        >
                            {punchTypeOptions.map((type, index) => (
                                <option key={index} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            id="dateInput"
                            value={attendance ? attendance.date.substring(0,10) : ""}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            onChange={handleChangePunchDate}
                        />
                    </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="punchTime" className="block text-sm font-bold text-gray-700 mb-2">
                            Time
                        </label>
                        <input
                            type="time"
                            id="punchTimeInput"
                            value={attendance ? attendance.expectedTime : ""}
                            className="w-full border border-gray-300 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            onChange={handleChangePunchTime}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Edit;
