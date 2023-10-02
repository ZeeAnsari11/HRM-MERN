import axios from "axios";
import { attendence, attendenceRoute } from "./configuration";
import { setAttendence } from "../states/reducers/slices/backend/Attendence";
import { toastMessage } from "../AlertConfigs";
import { toast } from "react-toastify";

export const timesheetAttendence = (dispatcher, _id) => {
  axios
    .post(attendenceRoute.getAttendence, {
      user: _id,
      startDate: new Date("1009:01:01"),
      endDate: Date.now(),
      filter: "missing-punches",
    })
    .then((response) => {
      dispatcher(setAttendence(response.data.Attendence));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const markAttendance = (form) => {
  axios
    .post(attendence.checkIO, form)
    .then((response) => {
      toastMessage("success", "Attendance Marked SuccessFully.", toast);
  })
  .catch((err) => {
      toastMessage("error", "PaySlip Generation Failed.", toast);
  })
};
