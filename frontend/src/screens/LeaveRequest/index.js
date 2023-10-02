import React, { useEffect, useState } from "react";
import { addHours, differenceInBusinessDays } from "date-fns";
import {
  getLeaveRequestByOrganizationId,
  getShortLeaveTypesByOrganizationId,
  saveFormData,
} from "../../api/leaverequest";
import {
  selectLeaveTypes,
  selectShortLeaveTypes,
} from "../../states/reducers/slices/backend/LeaveRequest";
import {
  selectOrgId,
  selectUID,
  selectUserLeaveTypes,
} from "../../states/reducers/slices/backend/UserSlice";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { commonStyles } from "../../styles/common";
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone";
import ComponentLoader from "../../components/Loader/ComponentLoader";

const LeaveRequest = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [reason, setReason] = useState("");
  const [short, setShort] = useState(false);
  const [availableLeaves, setAvailableLeaves] = useState("");
  const [count, setCount] = useState("");
  const [attachment, setAttachment] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [shortLeaveType, setShortLeaveType] = useState("");
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [selectedLeaveType, setSelectedLeaveType] = useState([]);

  const dispatcher = useDispatch();
  const org_id = useSelector(selectOrgId);
  const leaveTypes = useSelector(selectLeaveTypes);
  const shortLeaveTypes = useSelector(selectShortLeaveTypes);
  const leavesCount = useSelector(selectUserLeaveTypes);
  const user = useSelector(selectUID);

  const [loader, setLoader] = useState(true);

  const closeLoader = () => {
    setLoader(false)
  }
  useEffect(() => {
    getLeaveRequestByOrganizationId(org_id, dispatcher);
    getShortLeaveTypesByOrganizationId(org_id, dispatcher, closeLoader);
  }, []);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    if (!short) {
      if (endDate) {
        const count = getLeaveCount(e.target.value, endDate);
        setCount(count);
      }
    }
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (!short) {
      if (startDate) {
        const count = getLeaveCount(startDate, e.target.value);
        setCount(count);
      }
    }
  };

  const getLeaveCount = (start, end) => {
    const businessDays = differenceInBusinessDays(
      new Date(end),
      new Date(start)
    );
    // Assuming each day of leave is 8 hours
    const leaveCount = businessDays + 1;
    return leaveCount;
  };

  const handleTimeChange = (e) => {
    setShort(e.target.checked);
    setCount(0.5);
  };

  const handleStartTime = (e) => {
    const time = e.target.value;
    setStartTime(time);
    const endDateObj = addHours(new Date("2020-10-10T" + time), 4);
    let concater = "";
    if (endDateObj.getHours() < 10) concater = "0";
    setEndTime(
      (
        concater +
        endDateObj.getHours() +
        ":" +
        endDateObj.getMinutes()
      ).toString()
    );
  };

  const handleDrop = (acceptedFiles) => {
    setAttachment(acceptedFiles[0]);
    setAttachmentPreview(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop });

  const handleSubmit = (e) => {
    e.preventDefault();
    const organization = org_id;
    const newFormData = {
      user,
      leaveType,
      short,
      shortLeaveType,
      startTime,
      endTime,
      startDate,
      endDate,
      organization,
      reason,
    };
    saveFormData(newFormData);
  };

  if(!loader)
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl  mb-4 ">Create Leave Request</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="leave-type">
          Leave Type
        </label>
        <select
          className={commonStyles.input}
          id="leave-type"
          value={leaveType}
          onChange={(e) => {
            setLeaveType(e.target.value);
            setSelectedLeaveType(
              leaveTypes.filter((leaveType) => {
                if (leaveType._id === e.target.value) return leaveType;
              })
            );
          }}
          required
        >
          <option value="">Select leave type</option>
          {leaveTypes.map((type) => {
            return (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            );
          })}
        </select>
      </div>
      {selectedLeaveType[0]?.shortLeave && (
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2 pl-1 pr-4 py-2"
            htmlFor="short"
          >
            <input
              className={commonStyles.input}
              type="checkbox"
              id="short"
              checked={short}
              onChange={handleTimeChange}
            />
            <span className="text-sm font-medium">Short</span>
          </label>
        </div>
      )}
      {short && (
        <div className="mb-4">
          <label
            className="block text-gray-700  mb-2 "
            htmlFor="short-leave-type"
          >
            Short Leave Type
          </label>
          <select
            className={commonStyles.input}
            id="short-leave-type"
            value={shortLeaveType}
            onChange={(e) => setShortLeaveType(e.target.value)}
            required
          >
            <option value="">Select Short Leave Type</option>
            {shortLeaveTypes.map((type) => {
              return <option value={type._id}>{type.name}</option>;
            })}
          </select>
        </div>
      )}

      {short && (
        <div className="mb-4">
          <label className="block text-gray-700  mb-2 " htmlFor="start-time">
            Start Time
          </label>
          <input
            className={commonStyles.input}
            id="start-time"
            type="time"
            value={startTime}
            onChange={handleStartTime}
            required
          />
        </div>
      )}

      {short && (
        <div className="mb-4">
          <label className="block text-gray-700  mb-2 " htmlFor="end-time">
            End Time
          </label>
          <input
            className={commonStyles.input}
            id="end-time"
            value={endTime}
            type="time"
            readOnly={true}
          />
        </div>
      )}

      <div className="mb-4">
        <label
          className="block text-gray-700  mb-2 "
          htmlFor="available-leaves"
        >
          Available Leaves
        </label>
        <input
          className={commonStyles.input}
          id="available-leaves"
          type="text"
          value={availableLeaves}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700  mb-2 " htmlFor="start-date">
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
        <label className="block text-gray-700  mb-2 " htmlFor="end-date">
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
        <label className="block text-gray-700  mb-2 " htmlFor="count">
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

      {selectedLeaveType[0]?.attachmentRequired && (
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2 pl-1 "
            htmlFor="attachment"
          >
            Attachment
          </label>
          <div
            {...getRootProps()}
            className="border border-dashed p-4 border-backgroundDark "
          >
            <input {...getInputProps()} accept=".pdf,.doc,.docx,image/*" />
            {attachmentPreview ? (
              <img src={attachmentPreview} alt="Attachment Preview" />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                  className="text-4xl mb-4 mx-auto flex justify-center items-center"
                />
                <p className="text-center">
                  Drag 'n' drop some files here, or click to select files
                </p>
              </>
            )}
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="reason">
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
      <div className="flex items-center justify-between">
        <button className={commonStyles.btnDark} type="submit">
          Submit
        </button>
      </div>
    </form>
  );
  else return <ComponentLoader color='black'/>
};

export default LeaveRequest;
