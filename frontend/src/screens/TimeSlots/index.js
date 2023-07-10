import React, { useEffect, useState } from 'react';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';
import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Table from './src/Table'
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { createTimeSlot, getTimeSlotsByOrgId } from '../../api/timeSlots';

const TimeSlots = () => {
  let orgId;
  orgId = useSelector(selectCurrentUserOrg);
  const [showModal, setShowModal] = useState(false);
  const [toggleChange, setToggleChange] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);


  const [formData, setFormData] = useState({
    name: '',
    startTime: '',
    endTime: '',
    isOverNight: false,
    lateBuffer: '',
    earlyBuffer: '',
    punchBufferStart: '',
    punchBufferEnd: '',
    break: {
      name: '',
      startTime: '',
      endTime: '',
      inclusive: true
    },
    organization: orgId,
  });

  console.log("FORM DATA", formData)
  const handleInputChange = (e) => {
    if (e.target.name.startsWith('break.')) {
      setFormData({
        ...formData,
        break: {
          ...formData.break,
          [e.target.name.split('.')[1]]: e.target.value
        }
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };



  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  let LoadData = () => {
    getTimeSlotsByOrgId(orgId, setTimeSlots)
  }

  const handleCreateBranch = () => {
    createTimeSlot(formData, changeToggler);
    setShowModal(false);
    setFormData({
      name: '',
      startTime: '',
      endTime: '',
      isOverNight: false,
      lateBuffer: '',
      earlyBuffer: '',
      punchBufferStart: '',
      punchBufferEnd: '',
      break: {
        name: '',
        startTime: '',
        endTime: '',
        inclusive: true
      },
      organization: orgId,
    });
  };

  const handleAction = (rowData) => {

  };
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Start Time',
      accessor: 'startTime',
    },
    {
      Header: 'End Time',
      accessor: 'endTime',
    },
    {
      Header: 'Buffer Start',
      accessor: 'punchBufferStart',
    },
    {
      Header: 'Buffer End',
      accessor: 'punchBufferEnd',
    },
    {
      Header: 'Break StartTime',
      accessor: 'break.startTime',
    },
    {
      Header: 'Break EndTime',
      accessor: 'break.endTime',
    },
    {
      Header: 'Action',
      accessor: 'action',
      Cell: ({ row }) => (
        <div className="flex items-center ">
          <div className="pr-2">
            <button
              className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
              onClick={() => handleAction(row.original)}
            >
              <FontAwesomeIcon icon={faArrowAltCircleRight} />
            </button>
          </div>
          <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(row.original)}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      ),
    },
  ];

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const formattedTime = new Date();
    formattedTime.setHours(hours, minutes);
    return formattedTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  }

  const data = timeSlots.map((obj) => ({
    name: obj.name,
    startTime: convertToAMPM(obj.startTime),
    endTime: convertToAMPM(obj.endTime),
    punchBufferStart: obj.punchBufferStart,
    punchBufferEnd: obj.punchBufferEnd,
    break: {
      startTime: convertToAMPM(obj.break.startTime),
      endTime: convertToAMPM(obj.break.endTime)
    }
  }
  ))

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(!showModal)}
      >
        Create TimeSlot
      </button>

      {showModal && (
        <div className="bg-opacity-50">
          <div className="bg-white rounded p-8">
            <h2 className="text-lg font-bold mb-4">Create TimeSlot</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Name</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Start Time</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">End Time</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Is Overnight</label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  name="isOverNight"
                  value={formData.isOverNight}
                  onChange={handleInputChange}
                  required
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Late Buffer</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="number"
                  name="lateBuffer"
                  placeholder='Enter the minutes'
                  value={formData.lateBuffer}
                  onChange={handleInputChange}
                  min={0}
                  max={1440}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Early Buffer</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="number"
                  name="earlyBuffer"
                  value={formData.earlyBuffer}
                  placeholder='Enter the minutes'
                  onChange={handleInputChange}
                  min={0}
                  max={1440}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Punch Buffer Start</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="number"
                  name="punchBufferStart"
                  value={formData.punchBufferStart}
                  placeholder='Enter the minutes'
                  onChange={handleInputChange}
                  min={0}
                  max={1440}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Punch Buffer End</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="number"
                  name="punchBufferEnd"
                  placeholder='Enter the minutes'
                  value={formData.punchBufferEnd}
                  onChange={handleInputChange}
                  min={0}
                  max={1440}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Name</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="text"
                  name="break.name"
                  value={formData.break.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Start Time</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="time"
                  name="break.startTime"
                  value={formData.break.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break End Time</label>
                <input
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  type="time"
                  name="break.endTime"
                  value={formData.break.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-1">Break Inclusive</label>
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 w-full bg-gray-50"
                  name="break.inclusive"
                  value={formData.break.inclusive}
                  onChange={handleInputChange}
                  required
                >
                  <option value={true}>True</option>
                  <option value={false}>False</option>
                </select>
              </div>
            </form>
            <div className="flex justify-end">
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleCreateBranch}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={showModal ? 'bg-opacity-50 ' : ''}>
        <div className="min-h-screen bg-gray-100 text-gray-900">

        </div>
      </div>
    </div>
  );
};

export default TimeSlots;
