import React, { useState } from "react";
import { selectOrgId, selectUID } from "../../states/reducers/slices/backend/UserSlice";

import { CreateWfhRequest } from "../../api/wfh";
import Loader from "../../components/Loader";
import { commonStyles } from "../../styles/common";
import { differenceInBusinessDays } from 'date-fns';
import { useSelector } from "react-redux";

const WorkFromHomeRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [count, setCount] = useState("");
  const org_id = useSelector(selectOrgId);
  const user = useSelector(selectUID)
  const [isLoader,setIsLoader] = useState(false);

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

  const closeLoader = () => {
    setIsLoader(false);
  }

  const getWfhCount = (start, end) => {
    const businessDays = differenceInBusinessDays(new Date(end), new Date(start));
    const leaveCount = businessDays + 1;
    return leaveCount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoader(true);
    const organization = org_id
    const newFormData = {
      user,
      startDate,
      endDate,
      organization,
      reason
    };
    CreateWfhRequest(newFormData, closeLoader)
  };

  return (
    <form onSubmit={handleSubmit} className="rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Create WFH Request</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 pl-1" htmlFor="start-date">
          Start Date
        </label>
        <input
          className={commonStyles.input}
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
          className={commonStyles.input}
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
          className={commonStyles.input}
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
          className={commonStyles.input}
          id="reason"
          rows="4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        ></textarea>
      </div>
        <button
          className={commonStyles.btnDark}
          type="submit"
        >
          Submit {isLoader? <Loader color={'white'}/> : ""}
        </button>
    </form>
  );
};

export default WorkFromHomeRequest;
