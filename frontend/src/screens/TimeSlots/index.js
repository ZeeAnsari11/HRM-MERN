import React, { useEffect, useState } from 'react';
import { createTimeSlot, getTimeSlotsByOrgId } from '../../api/timeSlots';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';

import CTForm from './CTForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import TimeSlotsView from './TimeSlotsView';
import { commonStyles } from '../../styles/common';
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

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Slot Time',
      accessor: 'slotTime',
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
        <TimeSlotsView data={row.original} />
      ),
    },
  ];

  const convertToAMPM = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const minute = parseInt(minutes, 10);
    const meridiem = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12;
    const formattedMinute = minute.toString().padStart(2, '0');

    return `${formattedHour}:${formattedMinute} ${meridiem}`;
};
// console.log("=====time", timeSlots[0].startTime);
  const data = timeSlots.map((obj) => ({
    id: obj._id,
    name: obj.name,
    startTime: obj.startTime,
    endTime: obj.endTime,
    slotTime : `${convertToAMPM(obj.startTime)} - ${convertToAMPM(obj.endTime)}`,
    bufferTime: `${obj.punchBufferStart} - ${obj.punchBufferEnd}`,
    breakTime: `${convertToAMPM(obj.break.startTime)} - ${convertToAMPM(obj.break.endTime)}`,
    lateBuffer: obj.lateBuffer,
    earlyBuffer: obj.earlyBuffer,
    punchBufferStart: obj.punchBufferStart,
    punchBufferEnd: obj.punchBufferEnd,
    isOverNight: obj.isOverNight,
    inclusive: obj.break.inclusive,
    break: {
      name: obj.break.name,
      startTime: obj.break.startTime,
      endTime: obj.break.endTime,
      inclusive: obj.break
    },
  }
  ))

  const btnConfig = [
    {
      title: 'Create',
      handler: handleCreateBranch,
    }
  ]

  return (
      <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Table columns={columns} data={data} 
            element={
              <Modal
                action="Create Timeslot"
                title="Create Timeslot"
                btnStyle={commonStyles.btnDark}
                Element={<CTForm formData={formData} handleInputChange={handleInputChange} />}
                btnConfig={btnConfig}
              />
            }/>
      </main>
  );
};

export default TimeSlots;
