import { commonStyles } from "../../styles/common";
import { saveFormDataForMissingPunches } from "../../api/missingPunchesRequests";
import { selectCurrentUser } from "../../states/reducers/slices/backend/UserSlice";
import { useSelector } from 'react-redux';
import { useState } from "react";

export default function Attendence() {
  let user = useSelector(selectCurrentUser)
  const [formData, setFormData] = useState({
    user :user._id ,
    punchType: "",
    date: "",
    expectedTime: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveFormDataForMissingPunches(formData)
  };

  return (
    <div className="flex items-center justify-center py-4 mobile:h-screen">
      <div className="w-full mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Missing Punch Request</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="punchType" className="block mb-1">
              Punch Type
            </label>
            <select
              id="punchType"
              name="punchType"
              value={formData.punchType}
              onChange={handleInputChange}
              className="w-[100%] border-gray-300 border rounded px-4 py-2"
              required
            >
              <option value="">Select Punch Type</option>
              <option value="checkIn">Punch In</option>
              <option value="checkOut">Punch Out</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border-gray-300 border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="expectedTime" className="block mb-1">
              Expected Time
            </label>
            <input
              type="time"
              id="expectedTime"
              name="expectedTime"
              value={formData.expectedTime}
              onChange={handleInputChange}
              className="w-full border-gray-300 border rounded px-4 py-2"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className={commonStyles.btnDark}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
