import axios from "axios";
import { attendenceRoute } from "./configuration";
import { setAttendence } from "../states/reducers/slices/backend/Attendence";

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
