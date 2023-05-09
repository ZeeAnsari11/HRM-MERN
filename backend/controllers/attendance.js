import { AttendanceModel } from "../models/attendanceSchema.js";
import { handleCatch } from "../utils/common.js"
import moment from "moment";
import { UserModel } from "../models/userSchema.js";
import { TimeSlotsModel } from "../models/timeSlotsSchema.js";
import { LeaveRequestModel } from "../models/leaveRequestSchema.js";
const placeHolder = '1970-01-01T';

export const createAttendance = (req, res, next) => {
  try {
    if (req.body.user && req.body.date && (req.body.checkIn || req.body.checkOut) && Object.keys(req.body).length == 3) {
      if (req.body.checkIn && req.body.checkOut) throw "Invalid request body"
      if (req.body.checkIn) {
        AttendanceModel.findOne({ user: req.body.user, date: req.body.date, checkOut: { $ne: 'false' } })
          .then((AlreadyCheckedOut) => {
            if (AlreadyCheckedOut) throw "You Already CheckedOut Can Not CheckIn Now"
            const query = { user: req.body.user, date: req.body.date, checkIn: { $ne: 'false' } }
            checkAlreadyExists(req, res, next, query)
          })
          .catch(err => handleCatch(err, res, 401, next))
      }
      if (req.body.checkOut) {
        const query = { user: req.body.user, date: req.body.date, checkOut: { $ne: 'false' } }
        checkAlreadyExists(req, res, next, query)
      }
    }
    else handleCatch("Invalid request bodyxxx", res, 401, next)
  }
  catch (err) { handleCatch(err, res, 401, next) }
}

const checkAlreadyExists = (req, res, next, query) => {
  AttendanceModel.findOne(query)
    .then((objectFound) => {
      if (objectFound) throw "You already Did that action on this date"
      AttendanceModel.findOne({ user: req.body.user, date: req.body.date, checkIn: "false", checkOut: "false" })
        .then((exist) => {
          if (exist) throw "Your attendance is already marked on this date"
          fetchUserRosterDetails(req, res, next)
        })
        .catch(err => handleCatch(err, res, 401, next))
    })
    .catch(err => handleCatch(err, res, 401, next))
}

const fetchUserRosterDetails = (req, res, next) => {
  UserModel.findById(req.body.user).select("roster userRoster organization")
    .then(user => {
      const roster = user.roster.employeeRosterDetails.find(r => {
        return r.date.toDateString() === new Date(req.body.date).toDateString()
      });
      if (!roster) throw "No work details found for this date."
      TimeSlotsModel.find({ _id: user.userRoster.timeSlots, organization: user.organization }).select("startTime endTime punchBufferStart punchBufferEnd")
        .then((timeslot) => {
          if (timeslot.length == 0) throw "This User not contain any timeslot information"
          if (req.body.checkIn) calculateAttendanceStatus(req.body, timeslot[0], roster, user, res, next, "checkIn");
          if (req.body.checkOut) calculateAttendanceStatus(req.body, timeslot[0], roster, user, res, next, "checkOut");
        })
        .catch(err => handleCatch(err, res, 401, next))
    })
    .catch(err => handleCatch(err, res, 401, next))
}

const calculateAttendanceStatus = (body, timeSlot, rosterDetails, user, res, next, type = null) => {

  const [startHour, endHour] = rosterDetails.workingHours.split(' - ');
  const startTime = new Date(Date.UTC(1970, 0, 1, startHour.split(':')[0], startHour.split(':')[1], 0)).getTime();
  const endTime = new Date(Date.UTC(1970, 0, 1, endHour.split(':')[0], endHour.split(':')[1], 0)).getTime();
  const considerStartTime = new Date(startTime - (timeSlot.punchBufferStart * 60 * 1000));
  const considerEndTime = new Date(endTime + (timeSlot.punchBufferEnd * 60 * 1000));

  if (type == "checkIn") {
    const reqCheckInTime = body.checkIn.split(":");
    const checkInTime = new Date(Date.UTC(1970, 0, 1, reqCheckInTime[0], reqCheckInTime[1], reqCheckInTime[2]));
    const x = checkInTime.toLocaleString('en-US', { timeZone: 'UTC' });
    checkEarlyOrLateArrivalAndLeft(body, checkInTime, startTime, considerStartTime, res, next, type)
  }

  if (type == "checkOut") {
    const reqCheckOutTime = body.checkOut.split(":");
    const checkOutTime = new Date(Date.UTC(1970, 0, 1, reqCheckOutTime[0], reqCheckOutTime[1], reqCheckOutTime[2]));
    const x = checkOutTime.toLocaleString('en-US', { timeZone: 'UTC' });
    checkEarlyOrLateArrivalAndLeft(body, checkOutTime, endTime, considerEndTime, res, next, type)
  }
}

export const checkEarlyOrLateArrivalAndLeft = (body, puchTime, expectedTime, considerStartTime, res, next, type = null) => {
  try {
    if (puchTime.getUTCHours() < considerStartTime.getUTCHours() && type == "checkIn" ||
      (puchTime.getUTCHours() === considerStartTime.getUTCHours() && puchTime.getUTCMinutes() < considerStartTime.getUTCMinutes()) && type == "checkIn" ||
      (puchTime.getUTCHours() === considerStartTime.getUTCHours() && puchTime.getUTCMinutes() === considerStartTime.getUTCMinutes() && puchTime.getUTCSeconds() < considerStartTime.getUTCSeconds()) && type == "checkIn") {
      throw ('Machine Is Not started Yed.');
    }
    else if (puchTime.getUTCHours() > considerStartTime.getUTCHours() && type == "checkOut" ||
      (puchTime.getUTCHours() === considerStartTime.getUTCHours() && puchTime.getUTCMinutes() > considerStartTime.getUTCMinutes()) && type == "checkOut" ||
      (puchTime.getUTCHours() === considerStartTime.getUTCHours() && puchTime.getUTCMinutes() === considerStartTime.getUTCMinutes() && puchTime.getUTCSeconds() > considerStartTime.getUTCSeconds()) && type == "checkOut") {
      throw ('Machine Is Off Now.');
    }
    else {
      const duration = (new Date(expectedTime) - new Date(puchTime)) / (60 * 1000);
      if (duration < 0) {
        if (type == "checkIn") {
          body.isLateArrival = true,
            body.lateArrivalTime = Math.abs(duration)
          generateattendance(res, next, body)
        }
        if (type == "checkOut") {
          body.isLateLeft = true,
            body.lateLeftTime = Math.abs(duration)
          generateOrUpdateattendanceWhileCheckOut(res, next, body)
        }
      }
      else {
        if (type == "checkIn") {
          body.isEarlyArrival = true,
            body.earlyArrivalTime = duration
          generateattendance(res, next, body)
        }
        if (type == "checkOut") {
          body.isEarlyLeft = true,
            body.earlyLeftTime = duration
          generateOrUpdateattendanceWhileCheckOut(res, next, body)
        }
      }
    }
  }
  catch (err) { handleCatch(err, res, 401, next) }
}

const generateOrUpdateattendanceWhileCheckOut = (res, next, body) => {
  const query = { user: body.user, date: body.date, checkIn: { $ne: 'false' } }
  AttendanceModel.findOne(query)
    .then((doc) => {
      if (doc) {
        body.workedMinutes = (new Date(placeHolder + body.checkOut) - new Date(placeHolder + doc.checkIn)) / (60 * 1000);
        body.isPresent = true
        AttendanceModel.findByIdAndUpdate(doc._id, body, { runValidators: true })
          .then(() => {
            res.status(200).json({
              success: true,
              Message: `Updated Successfully`
            })
          })
          .catch(err => handleCatch(err, res, 401, next))
      }
      else {
        generateattendance(res, next, body);
      }
    })
    .catch(err => handleCatch(err, res, 401, next))
}

const generateattendance = (res, next, body) => {
  AttendanceModel.create(body)
    .then((response) => {
      res.status(200).json({
        success: true,
        response
      })
    })
    .catch(err => handleCatch(err, res, 401, next))
}

export const markAbsent = (req, res, next) => {
  let count = 0;
  UserModel.findById(req.body.user)
    .then((user) => {
      if (!user) throw "user not found"
      const date = moment(req.body.date, 'YYYY-MM-DD');
      for (let i = 1; i <= 7; i++) {
        const prevDate = date.clone().subtract(i, 'days');
        let newDate = prevDate.format('YYYY-MM-DD')
        AttendanceModel.find({ user: req.body.user, date: newDate })
          .then((attendance) => {
            count++;
            if (attendance.length == 0) {
              if (!user.userRoster.restDays.includes(prevDate.day())) {
                AttendanceModel.create({ user: req.body.user, date: prevDate.format('YYYY-MM-DD'), isAbsent: true })
              }
            }
            if (count == 7) {
              res.status(200).json({
                success: true,
                message: "Synced Successfully"
              })
            }
          })
          .catch(err => handleCatch(err, res, 401, next))
      }
    })
    .catch(err => handleCatch(err, res, 401, next))
}

// Filter on the basis of missing-punches, early-left, late-left, early-arrival, late-arrival, present, absent
export const filterAttendance = (req, res, next) => {
  try {
    let query;
    let subQuery = {}
    if (req.body.user && req.body.startDate && req.body.endDate && req.body.filter) {
      UserModel.findById(req.body.user)
        .then((user) => {
          if (!user) throw "User not found"
          if (req.body.filter == "missing-punches") {
            query = {
              $and: [
                {
                  $or: [
                    { checkIn: "false" },
                    { checkOut: "false" }
                  ]
                },
                { user: req.body.user },
                {
                  date: {
                    $gte: new Date(req.body.startDate + "T00:00:00.000+00:00"),
                    $lte: new Date(req.body.endDate + "T00:00:00.000+00:00")
                  }
                },
                {
                  isAbsent: false
                }
              ]
            }
          }
          else {
            let x = req.body.filter
            subQuery[x] = true;
            query = {
              $and: [
                subQuery
                ,
                { user: req.body.user },
                {
                  date: {
                    $gte: new Date(req.body.startDate + "T00:00:00.000+00:00"),
                    $lte: new Date(req.body.endDate + "T00:00:00.000+00:00")
                  }
                }
              ]
            }
          }
          AttendanceModel.find(query)
            .then((response) => {
              res.status(200).json({
                success: true,
                count: response.length,
                response
              })
            })
            .catch(err => handleCatch(err, res, 401, next));
        })
        .catch(err => handleCatch(err, res, 401, next));
    }
    else throw "Invalid request body"
  }
  catch (err) { handleCatch(err, res, 401, next) }
}

export const updateAttendance = (req, res, next, leave = null) => {
  try {
    if (leave) {
      LeaveRequestModel.findById(req.body.requestId)
        .then((leave) => {
          return AttendanceModel.find({
            user: req.body.senderId, date: {
              $gte: new Date(leave.startDate),
              $lte: new Date(leave.endDate)
            }, isAbsent: true
          })
            .then((attendances) => {
              attendances.forEach(attendance => {
                attendance.isAbsent = false;
                attendance.onLeave = true
                attendance.save()
              })
              res.status(200).json({
                success: true,
                msg: 'Leave request is approved successfully and attendance is updated.'
              })
            })
        })
        .catch(error => { handleCatch(error, res, 401, next) })
    }
    if ((req.body.checkIn || req.body.checkOut) && req.body.user && req.body.date) {
      AttendanceModel.find({ user: req.body.user, date: new Date(req.body.date + "T00:00:00.000+00:00") })
        .then((attendance) => {
          console.log("===========attedndece=========", attendance);
          if (attendance.length == 0) throw "No Missing punche for attendece available for this date"
          if (req.body.checkIn && attendance[0].checkIn !== "false") { throw "Already checkedIn can not checkedIn again" }
          if (req.body.checkOut && attendance[0].checkOut !== "false") { throw "Already checkOut can not checkOut again" }
          if (req.body.checkIn) {
            if (attendance[0].checkOut != "false") {
              attendance[0].workedMinutes = (new Date(placeHolder + attendance[0].checkOut) - new Date(placeHolder + req.body.checkIn)) / (60 * 1000);
              attendance[0].isPresent = true
            }
            attendance[0].checkIn = req.body.checkIn;
            attendance[0].isAbsent = false
          }
          if (req.body.checkOut) {
            if (attendance[0].checkIn != "false") {
              attendance[0].workedMinutes = (new Date(placeHolder + req.body.checkOut) - new Date(placeHolder + attendance[0].checkIn)) / (60 * 1000);
              attendance[0].isPresent = true
            }
            attendance[0].checkOut = req.body.checkOut;
            attendance[0].isAbsent = false
          }
          attendance[0].save()
            .then((result) => {
              res.status(200).json({
                success: true,
                result
              })
            })
            .catch(err => {
              console.log("==========err=============", err);
              handleCatch(err, res, 401, next)
            })
        })
        .catch(err => handleCatch(err, res, 401, next))
    }
  }
  catch (err) { handleCatch(err, res, 401, next) }
}