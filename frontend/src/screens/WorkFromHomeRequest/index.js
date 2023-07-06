import React, { useState } from "react";
import { differenceInBusinessDays } from 'date-fns';
import { useSelector } from "react-redux";
import { selectOrgId, selectUID } from "../../states/reducers/slices/backend/UserSlice";
import { CreateWfhRequest } from "../../api/wfh";

const WorkFromHomeRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [count, setCount] = useState("");
  const org_id = useSelector(selectOrgId);
  const user = useSelector(selectUID)

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (endDate) {
      const count = getWfhCount(e.target.value, endDate);
      setCount(count);
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
      if (startDate) {
        const count = getWfhCount(startDate, e.target.value);
        setCount(count);
    }

  };

  const getWfhCount = (start, end) => {
    const businessDays = differenceInBusinessDays(new Date(end), new Date(start));
    const leaveCount = businessDays + 1;
    return leaveCount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const organization = org_id
    const newFormData = {
      user,
      startDate,
      endDate,
      organization,
      reason
    };
    console.log(newFormData);
    CreateWfhRequest(newFormData)
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-lg font-medium mb-4 ">Create WFH Request</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 pl-1" htmlFor="start-date">
          Start Date
        </label>
        <input
          className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="start-date"
          type="date"
          value={startDate}
          onChange={handleStartDateChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 pl-1" htmlFor="end-date">
          End Date
        </label>
        <input
          className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="end-date"
          type="date"
          value={endDate}
          onChange={handleEndDateChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 pl-1" htmlFor="count">
          Count
        </label>
        <input
          className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="count"
          type="number"
          value={count}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 pl-1" htmlFor="reason">
          Reason
        </label>
        <textarea
          className="shadow appearance-none border border-backgroundDark rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
          id="reason"
          rows="4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-backgroundDark hover:bg-white hover:text-backgroundDark border border-backgroundDark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default WorkFromHomeRequest;
