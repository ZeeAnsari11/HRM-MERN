import React, { useEffect, useState } from 'react';
import { createTimeSlot, getTimeSlotsByOrgId } from '../../api/timeSlots';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';

import CTForm from './CTForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import { selectCurrentUserOrg } from '../../states/reducers/slices/backend/UserSlice';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  let orgId = useSelector(selectCurrentUserOrg);
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

  const handleCreateBranch = (trigger) => {
    createTimeSlot(formData, changeToggler, trigger);
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
      Header: 'Buffer Time(min)',
      accessor: 'bufferTime',
    },
    {
      Header: 'Break Time',
      accessor: 'breakTime',
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
    bufferTime: `${obj.punchBufferStart} - ${obj.punchBufferEnd}`,
    breakTime: `${convertToAMPM(obj.break.startTime)} - ${convertToAMPM(obj.break.endTime)}`
  }
  ))

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateBranch,
    }
  ]

  return (
    <div>
      <Modal
        action="Create Timeslot"
        title="Create Timeslot"
        Element={<CTForm formData={formData} handleInputChange={handleInputChange} />}
        btnConfig={btnConfig}
      />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="mt-6">
          <Table columns={columns} data={data} />
        </div>
      </main>
    </div>
  );
};

export default TimeSlots;
