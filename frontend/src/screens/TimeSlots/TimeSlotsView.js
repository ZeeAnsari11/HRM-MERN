import { selectCurrentUserOrg, selectCurrentUserRole } from '../../states/reducers/slices/backend/UserSlice';

import CTForm from './CTForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { updateTimeSlotById } from '../../api/timeSlots';
import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function TimeSlotsView({ data }) {
  
  let orgId = useSelector(selectCurrentUserOrg);
  let role = useSelector(selectCurrentUserRole);
  
    const [formData, setFormData] = useState({
        name: data.name,
        startTime: data.startTime,
        endTime: data.endTime,
        isOverNight: data.isOverNight,
        lateBuffer: data.lateBuffer,
        earlyBuffer: data.earlyBuffer,
        punchBufferStart: data.punchBufferEnd,
        punchBufferEnd: data.punchBufferEnd,
        break: {
          name: data.break.name,
          startTime: data.break.startTime,
          endTime: data.break.endTime,
          inclusive: data.inclusive
        }
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
        }
      })

    const handleUpdateDepartmennt = (trigger) => {
      const newValidationErrors = {};
    if (formData.name.trim() === "") {
      newValidationErrors.name = "Name is required.";
    }
    if (formData.startTime === "") {
      newValidationErrors.startTime = "Start Time is required.";
    }
    if (formData.endTime === "") {
      newValidationErrors.endTime = "End Time is required.";
    }
    if (formData.lateBuffer === "") {
      newValidationErrors.lateBuffer = "Late Buffer is required.";
    }
    if (formData.earlyBuffer === "") {
      newValidationErrors.earlyBuffer = "Early Buffer Time is required.";
    }
    if (formData.punchBufferStart === "") {
      newValidationErrors.punchBufferStart = "Punch BufferStart Time is required.";
    }
    if (formData.punchBufferEnd === "") {
      newValidationErrors.punchBufferEnd = "Punch BufferEnd Time is required.";
    }

    if (formData.break.name.trim() === "") {
      newValidationErrors.break = {}
      newValidationErrors.break.name = "Break Name is required.";
    }
    if (formData.break.startTime === "") {
      newValidationErrors.break = {...newValidationErrors.break}
      newValidationErrors.break.startTime = "Break startTime is required.";
    }
    if (formData.break.endTime === "") {
      newValidationErrors.break = {...newValidationErrors.break}
      newValidationErrors.break.endTime = "Break endTime is required.";
    }
    if (Object.keys(newValidationErrors).length > 0) {
      // Set validation errors and prevent closing the modal
      setValidationErrors(newValidationErrors);
      trigger();
      return;
    }
        updateTimeSlotById(data.id, formData, trigger, orgId, role);
    };

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

    let title = "Update Department"
    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]



    // const handleAction = (id) => {
    //     deleteTimeSlotById(id);
    // }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            // Element={<CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={false} />}
            Element={<CTForm formData={formData} handleInputChange={handleInputChange} validationErrors={validationErrors}/>}
            btnConfig={btnConfig}
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
        {
         //          DELETE BUTTON FUNCTIONALITY ALREADY IMPLEMENTED
        /* <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button> */}
    </div>
}