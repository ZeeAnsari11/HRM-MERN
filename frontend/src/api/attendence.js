import axios from "axios";
import { attendence, attendenceRoute } from "./configuration";
import { setAttendence } from "../states/reducers/slices/backend/Attendence";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const timesheetAttendence = (dispatcher, _id) => {
  // axios
  //   .post(attendenceRoute.getAttendence, {
  //     user: _id,
  //     startDate: new Date("1009:01:01"),
  //     endDate: Date.now(),
  //     filter: "missing-punches",
  //   })
  //   .then((response) => {
  //     dispatcher(setAttendence(response.data.Attendence));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
};

export const markAttendance = (form) => {
  axios
    .post(attendence.checkIO, form)
    .then((response) => {
      toastMessage("success", "Attendance Marked SuccessFully.", toast);
  })
  .catch((err) => {
    console.log("Error", err);
      toastMessage("error", err.response.data.Message, toast);
  })
};

export const deleteAttendanceRequest = (id) => {
  axios.delete(attendence.delete + id)
  .then((response) => {
      toastMessage("success", "Attendance Request Deleted Succefully", toast)
      setTimeout(() => {
          window.location.href = "/dashboard/attendence"
      }, 2000)
      console.log(response);
  })
  .catch((error) => {
      console.log(error.response.data.Message);
  });
 
}

export const updateAttendanceRequest = (attendance, id) => {
  axios.put(attendence.update + id, attendance)
  .then((response) => {
      toastMessage("success", "Missing Punches Request Updated Succefully", toast)
      setTimeout(() => {
          window.location.href = "/dashboard/attendence"
      }, 2000)
      console.log(response);
  })
  .catch((error) => {
      console.log(error.response.data);
  });
 
}
