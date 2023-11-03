import React, { useState } from 'react';

export const GlobalRequestForm = ({ leaveRequest }) => {

  const [formData, setFormData] = useState({ ...leaveRequest });
  const [status, setStatus] = useState(formData.status);

  const handleInputChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6  bg-white rounded-xl shadow-md space-y-5">
      <div>
        <label className="text-sm font-bold text-gray-600 block">User:</label>
        <input
          type="text"
          name="user"
          value={formData.user}
          readOnly
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>
      {formData.count && <div>
        <label className="text-sm font-bold text-gray-600 block">Count:</label>
        <input
          type="number"
          name="count"
          value={formData.count}
          readOnly
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>}
      {formData.short && <div className="flex items-center">
        <input
          type="checkbox"
          name="short"
          checked={formData.short == 'Yes' ? true : false}
          disabled
          onChange={() => setFormData({ ...formData, short: !formData.short })}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="ml-2 text-gray-700">Short</label>
      </div>}
      <div>
        {formData.status !== "approved" && formData.status !== "rejected" ? (
          <div>
            <label className="text-sm font-bold text-gray-600 block">Status:</label>
            <select
              name="status"
              value={status}
              onChange={handleInputChange}
              className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        ) :
          <>
            <label className="text-sm font-bold text-gray-600 block">Status:</label>
            <input
              type="text"
              name="leaveType"
              value={status}
              readOnly
              className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
            />
          </>
        }
      </div>
      {formData.leaveType && (
        <div>
          <label className="text-sm font-bold text-gray-600 block">Leave Type:</label>
          <input
            type="text"
            name="leaveType"
            value={formData.leaveType}
            readOnly
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
          />
        </div>
      )}
      {formData.startDate && <div>
        <label className="text-sm font-bold text-gray-600 block">Start Date:</label>
        <input
          type="startDate"
          name="startDate"
          readOnly
          value={formData.startDate}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>
      }
      {formData.endDate && <div>
        <label className="text-sm font-bold text-gray-600 block">End Date:</label>
        <input
          type="endDate"
          name="endDate"
          readOnly
          value={formData.endDate}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>}
      {formData.shortStartTime && (
        <>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Short Start Time:</label>
            <input
              type="text"
              name="shortStartTime"
              value={new Date(formData.shortStartTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              readOnly
              className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block">Short End Time:</label>
            <input
              type="text"
              name="shortStartTime"
              value={new Date(formData.shortEndTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
              readOnly
              className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
            />
          </div>
        </>
      )}
      {formData.punchType && <div>
        <label className="text-sm font-bold text-gray-600 block">Punch Type:</label>
        <input
          type="text"
          name="date"
          readOnly
          value={formData.punchType}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>
      }
      {formData.date && <div>
        <label className="text-sm font-bold text-gray-600 block">Date:</label>
        <input
          type="date"
          name="date"
          readOnly
          value={formData.date}
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>
      }
      {formData.expectedTime && (
        <div>
          <label className="text-sm font-bold text-gray-600 block">Expected Time:</label>
          <input
            type="text"
            name="expectedTime"
            readOnly
            value={
              formData.expectedTime.includes(':')
                ? new Date(`1970-01-01T${formData.expectedTime}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })
                : new Date(formData.expectedTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })
            }
            className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
          />
        </div>
      )}
      {formData.reason && <div>
        <label className="text-sm font-bold text-gray-600 block">Reason:</label>
        <input
          type="text"
          name="user"
          value={formData.reason}
          readOnly
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>}
      {formData.description && <div>
        <label className="text-sm font-bold text-gray-600 block">Description:</label>
        <input
          type="text"
          name="user"
          value={formData.description}
          readOnly
          className="border rounded-lg px-3 py-2 mt-1 mb-5 w-full"
        />
      </div>}

    </form>
  );
};

export default GlobalRequestForm;
