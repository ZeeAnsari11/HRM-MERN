import React, { useEffect, useState } from 'react';
import { createTimeSlot, getTimeSlotsByOrgId } from '../../api/timeSlots';
import { faArrowAltCircleRight, faEye } from '@fortawesome/free-solid-svg-icons';
import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import CTForm from './CTForm';
import ComponentLoader from '../../components/Loader/ComponentLoader';
import Modal from '../../components/Modal';
import Table from '../../components/Table';
import TimeSlotsView from './TimeSlotsView';
import { commonStyles } from '../../styles/common';
import { useSelector } from 'react-redux';

const TimeSlots = () => {
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  
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
  const [validationErrors, setValidationErrors] = useState({
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
  })

  const handleInputChange = (e) => {
    if (e.target.name.startsWith('break.')) {
      setFormData({
        ...formData,
        break: {
          ...formData.break,
          [e.target.name.split('.')[1]]: e.target.value
        }
      });
      setValidationErrors({
        ...validationErrors,
        "break": { ...validationErrors.break, [e.target.name]: "" },
        [e.target.name]: "", // Add this line
      });

    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
      setValidationErrors({
        ...validationErrors,
        "break": { ...validationErrors.break, [e.target.name]: "" },
        [e.target.name]: "", // Add this line
      });

    }
  };


  useEffect(() => {
    LoadData()
  }, [toggleChange]);

  const changeToggler = () => {
    setToggleChange(!toggleChange);
  }

  const [loader, setLoader] = useState(true);

  const timeslotsLoader = () => {
    setLoader(false)
  }

  let LoadData = () => {
    getTimeSlotsByOrgId(orgId, setTimeSlots, timeslotsLoader, role)
  }

  const handleCreateTimeSlots = (trigger) => {
    const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.startTime.trim() === "") {
      newValidationErrors.startTime = "Start Time is required.";
    }
    if (formData.endTime.trim() === "") {
      newValidationErrors.endTime = "End Time is required.";
    }
    if (formData.lateBuffer.trim() === "") {
      newValidationErrors.lateBuffer = "Late Buffer is required.";
    }
    if (formData.earlyBuffer.trim() === "") {
      newValidationErrors.earlyBuffer = "Early Buffer Time is required.";
    }
    if (formData.punchBufferStart.trim() === "") {
      newValidationErrors.punchBufferStart = "Punch BufferStart Time is required.";
    }
    if (formData.punchBufferEnd.trim() === "") {
      newValidationErrors.punchBufferEnd = "Punch BufferEnd Time is required.";
    }

    if (formData.break.name.trim() === "") {
      newValidationErrors.break = {}
      newValidationErrors.break.name = "Break Name is required.";
    }
    if (formData.break.startTime.trim() === "") {
      newValidationErrors.break = {...newValidationErrors.break}
      newValidationErrors.break.startTime = "Break startTime is required.";
    }
    if (formData.break.endTime.trim() === "") {
      newValidationErrors.break = {...newValidationErrors.break}
      newValidationErrors.break.endTime = "Break endTime is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
    createTimeSlot(formData, changeToggler, trigger, orgId, role);
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
    slotTime: `${convertToAMPM(obj.startTime)} - ${convertToAMPM(obj.endTime)}`,
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
      handler: handleCreateTimeSlots,
    }
  ]

  if(!loader)
  return (
    <main className="mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="mt-6">
        <Table columns={columns} data={data} element={
          <Modal
            action="Create TimeSlots"
            title="Create TimeSlots"
            btnStyle={commonStyles.btnDark}
            Element={<CTForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors} />}
            btnConfig={btnConfig}
            validationErrors={validationErrors}
            check={(closeModal) => {
              if (
                !validationErrors.name &&
                !validationErrors.startTime &&
                !validationErrors.endTime &&
                !validationErrors.lateBuffer &&
                !validationErrors.earlyBuffer &&
                !validationErrors.punchBufferStart &&
                !validationErrors.punchBufferEnd &&
                !validationErrors.break?.name &&
                !validationErrors.break?.startTime &&
                !validationErrors.break?.endTime &&
                formData?.name.trim() &&
                formData.startTime &&
                formData.endTime &&
                formData.lateBuffer &&
                formData.earlyBuffer &&
                formData.punchBufferStart &&
                formData.punchBufferEnd &&
                formData.break?.name.trim() &&
                formData.break?.startTime &&
                formData.break?.endTime
              ) {
                closeModal();
              }
            }}
          />
        } />
      </div>
    </main>
  );
  else return <ComponentLoader color="black" />;
};

export default TimeSlots;
