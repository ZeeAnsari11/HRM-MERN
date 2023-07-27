import { deleteDesiginationById, updateDesiginationById } from '../../api/designation';
import { deleteTimeSlotById, updateTimeSlotById } from '../../api/timeSlots';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

import CTForm from './CTForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../../components/Modal';
import React from 'react';
import { useState } from 'react';

export default function TimeSlotsView({ data }) {

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

    const handleUpdateDepartmennt = (trigger) => {
        updateTimeSlotById(data.id, formData, trigger);
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
        } else {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value
          });
        }
      };

    let title = "Update Department"
    // const formDataConfig = [
    //     {
    //         label: 'Name',
    //         type: 'text',
    //         name: 'name',
    //         value: formData.name,
    //         onChange: handleInputChange,
    //     },
    //     {
    //         label: 'Start Time',
    //         type: 'text',
    //         name: 'startTime',
    //         value: formData.startTime,
    //         onChange: handleInputChange,
    //     },
    //     {
    //         label: 'End Time',
    //         type: 'text',
    //         name: 'endTime',
    //         value: formData.endTime,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'isOverNight',
    //         type: 'boolean',
    //         name: 'isOverNight',
    //         value: formData.isOverNight,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'Late Buffer',
    //         type: 'text',
    //         name: 'lateBuffer',
    //         value: formData.lateBuffer,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'Early Buffer',
    //         type: 'text',
    //         name: 'earlyBuffer',
    //         value: formData.earlyBuffer,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'Punch Buffer Start',
    //         type: 'text',
    //         name: 'punchBufferStart',
    //         value: formData.punchBufferStart,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'Punch Buffer End',
    //         type: 'text',
    //         name: 'punchBufferEnd',
    //         value: formData.punchBufferEnd,
    //         onChange: handleInputChange,
    //     }, 
    //     {
    //         label: 'Break Name',
    //         type: 'text',
    //         name: 'break["name"]',
    //         value: formData.break.name,
    //         onChange: handleInputChange,
    //     },
    //     {
    //         label: 'Break Start Time',
    //         type: 'text',
    //         name: 'break["startTime"]',
    //         value: formData.break.startTime,
    //         onChange: handleInputChange,
    //     },
    //     {
    //         label: 'Break End Time',
    //         type: 'text',
    //         name: 'break["endTime"]',
    //         value: formData.break.endTime,
    //         onChange: handleInputChange,
    //     },
    //     {
    //         label: 'Break Inclusive',
    //         type: 'text',
    //         name: 'break["inclusive"]',
    //         value: formData.break.inclusive,
    //         onChange: handleInputChange,
    //     }
    // ]

    const btnConfig = [{
        title: 'Update',
        handler: handleUpdateDepartmennt,
    }]



    const handleAction = (id) => {
        console.log("=====1=======",id);
        deleteTimeSlotById(id);
    }

    return <div className="flex items-center space-x-2">
        <Modal
            action={<FontAwesomeIcon icon={faPencil} className="text-backgroundDark cursor-pointer hover:text-gray-600" />}
            title={title}
            // Element={<CUForm config={formDataConfig} handleInputChange={handleInputChange} isFull={false} />}
            Element={<CTForm formData={formData} handleInputChange={handleInputChange}/>}
            btnConfig={btnConfig}

        />
        <button
            className="bg-transparent hover:bg-gray-200 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow"
            onClick={() => handleAction(data.id)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </div>
}