import { AttendanceModel } from "../models/attendenceSchema.js";
import { handleCatch } from "../utils/common.js"
import moment from "moment";
import { UserModel } from "../models/userSchema.js";
import { TimeSlotsModel } from "../models/timeSlotsSchema.js";
const placeHolder = '1970-01-01T';

export const createAttendence = (req, res, next) => {
  try {
    if (req.body.user && req.body.date && (req.body.checkIn || req.body.checkOut) && Object.keys(req.body).length == 3) {
      console.log("=====called===2===");
      if (req.body.checkIn && req.body.checkOut) throw "Invalid request body"
      if (req.body.checkIn) {
        AttendanceModel.findOne({ user: req.body.user, date: req.body.date, checkOut: { $ne: 'false' } })
          .then((AlreadyCheckedOut) => {
            console.log("=======AlreadyCheckedOut====", AlreadyCheckedOut);
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
    else {
      handleCatch("Invalid request bodyxxx", res, 401, next)
    }
  }
  catch (err) { handleCatch(err, res, 401, next) }
}

const checkAlreadyExists = (req, res, next, query) => {
  console.log("===============", query);
  AttendanceModel.findOne(query)
    .then((checkInObject) => {
      console.log("=======checkInObject====", checkInObject);
      if (checkInObject) throw "You already Did that action on this date"
      fetchUserRosterDetails(req, res, next)
    })
    .catch(err => handleCatch(err, res, 401, next))
}

const fetchUserRosterDetails = (req, res, next) => {
  UserModel.findById(req.body.user).select("roster userRoster organization")
    .then(user => {
      console.log("===============user=========", user);
      const roster = user.roster.employeeRosterDetails.find(r => {
        console.log("========r========", r);
        console.log("====r.date.toDateString()=====", r.date.toDateString());
        console.log("====new Date(req.body.date).toDateString()=====", new Date(req.body.date).toDateString());

        return r.date.toDateString() === new Date(req.body.date).toDateString()
      });
      console.log("===============roster=========", roster);
      if (!roster) throw "No work details found for this date."
      console.log("======user.userRoster.timeSlots========", user.userRoster.timeSlots);
      console.log("======user.organization========", user.organization);

      TimeSlotsModel.find({ _id: user.userRoster.timeSlots, organization: user.organization }).select("startTime endTime punchBufferStart punchBufferEnd")
        .then((timeslot) => {
          console.log("===============timeslot=========", timeslot[0]);
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

  const startTimeString = new Date(startTime).toLocaleString('en-US', { timeZone: 'UTC' });
  const endTimeString = new Date(endTime).toLocaleString('en-US', { timeZone: 'UTC' });
  const newTime = new Date(considerStartTime).toLocaleString('en-US', { timeZone: 'UTC' });
  const newTime2 = new Date(considerEndTime).toLocaleString('en-US', { timeZone: 'UTC' });

  console.log("==startTimeString===", startTimeString);
  console.log("==endTimeString===", endTimeString);
  console.log("==considerStartTime===", newTime);
  console.log("==considerEndTime===", newTime2);



  if (type == "checkIn") {
    console.log("===========1===========");
    const reqCheckInTime = body.checkIn.split(":");
    const checkInTime = new Date(Date.UTC(1970, 0, 1, reqCheckInTime[0], reqCheckInTime[1], reqCheckInTime[2]));
    const x = checkInTime.toLocaleString('en-US', { timeZone: 'UTC' });
    console.log("==reqTime==puchIn=", x);
    checkEarlyOrLateArrivalAndLeft(body, checkInTime, startTime, considerStartTime, res, next, type)
  }

  if (type == "checkOut") {
    const reqCheckOutTime = body.checkOut.split(":");
    const checkOutTime = new Date(Date.UTC(1970, 0, 1, reqCheckOutTime[0], reqCheckOutTime[1], reqCheckOutTime[2]));
    const x = checkOutTime.toLocaleString('en-US', { timeZone: 'UTC' });
    console.log("==reqTime==PuchOur=", x);
    checkEarlyOrLateArrivalAndLeft(body, checkOutTime, endTime, considerEndTime, res, next, type)
  }
}

export const checkEarlyOrLateArrivalAndLeft = (body, puchTime, expectedTime, considerStartTime, res, next, type = null) => {
  try {
    console.log("=========uloooo==========");
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
      console.log("==========duration=====", duration);
      if (duration < 0) {
        if (type == "checkIn") {
          console.log("===========late==ari===", duration);
          body.isLateArrival = true,
            body.lateArrivalTime = Math.abs(duration)
          console.log("=====body==ari====", body);
          generateAttendence(res, next, body)
        }
        if (type == "checkOut") {
          console.log("===========late==left===", duration);
          body.isLateLeft = true,
            body.lateLeftTime = Math.abs(duration)
          console.log("=====body==left====", body);
          generateOrUpdateAttendenceWhileCheckOut(res, next, body)
        }

      }
      else {
        if (type == "checkIn") {
          console.log("===========early==ari===", duration);
          body.isEarlyArrival = true,
            body.earlyArrivalTime = duration
          console.log("=====body===ari===", body);
          generateAttendence(res, next, body)
        }
        if (type == "checkOut") {
          console.log("===========early===left==", duration);
          body.isEarlyLeft = true,
            body.earlyLeftTime = duration
          generateOrUpdateAttendenceWhileCheckOut(res, next, body)
          console.log("===========body==left===", body);
        }
      }
    }
  }
  catch (err) { handleCatch(err, res, 401, next) }
}

const generateOrUpdateAttendenceWhileCheckOut = (res, next, body) => {
  const query = { user: body.user, date: body.date, checkIn: { $ne: 'false' } }
  AttendanceModel.findOne(query)
    .then((doc) => {
      if (doc) {
        body.workedMinutes = (new Date(placeHolder + body.checkOut) - new Date(placeHolder + doc.checkIn)) / (60 * 1000);
        body.isPresent = true
        console.log("-------------------workedMinutes-------", body.workedMinutes);
        AttendanceModel.findByIdAndUpdate(doc._id, body, { runValidators: true })
          .then((response) => {
            res.status(200).json({
              success: true,
              Message: `Updated Successfully`
            })
          })
          .catch(err => handleCatch(err, res, 401, next))
      }
      else {
        generateAttendence(res, next, body);
      }
    })
    .catch(err => handleCatch(err, res, 401, next))
}

const generateAttendence = (res, next, body) => {
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
  console.log("======called===");
  let count = 0;
  UserModel.findById(req.body.user)
    .then((user) => {
      console.log("========1=========");
      if (!user) throw "user not found"
      const date = moment(req.body.date, 'YYYY-MM-DD');
      for (let i = 1; i <= 7; i++) {
        const prevDate = date.clone().subtract(i, 'days');
        let newDate = prevDate.format('YYYY-MM-DD')
        AttendanceModel.find({ user: req.body.user, date: newDate })
          .then((attendence) => {
            count++;
            console.log("==========count========", count);
            console.log("=====attendence=====", user.userRoster.restDays);
            console.log("=====prevDate.day()=====", prevDate.day(), "=======", prevDate.format('dddd'));
            if (attendence.length == 0) {
              if (!user.userRoster.restDays.includes(prevDate.day())) {
                console.log("==npt==incled==========", prevDate.day());
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
export const filterAttendence = (req, res, next) => {
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
            console.log("==subQuery====", subQuery);
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
          console.log("====qury--------", query);
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

export const updateAttendence = (req, res, next) => {
  try {
    if ((req.body.checkIn || req.body.checkOut) && req.body.user && req.body.date) {
      AttendanceModel.find({ user: req.body.user, date: new Date(req.body.date + "T00:00:00.000+00:00") })
        .then((attendence) => {
          console.log("========attendene========", attendence);
          if (attendence.length == 0) throw "No Missing punche for attendece available for this date"
          if (req.body.checkIn && attendence[0].checkIn !== "false") { throw "Already checkedIn can not checkedIn again" }
          if (req.body.checkOut && attendence[0].checkOut !== "false") { throw "Already checkOut can not checkOut again" }
          if (req.body.checkIn) {
            if (attendence[0].checkOut != "false") {
              attendence[0].workedMinutes = (new Date(placeHolder + attendence[0].checkOut) - new Date(placeHolder + req.body.checkIn)) / (60 * 1000);
              console.log("====checkin====wh===", attendence[0].workedMinutes);
              attendence[0].isPresent = true
            }
            attendence[0].checkIn = req.body.checkIn;
            attendence[0].isAbsent = false   
          }
          if (req.body.checkOut) {
            if (attendence[0].checkIn != "false") {
              attendence[0].workedMinutes = (new Date(placeHolder + req.body.checkOut) - new Date(placeHolder + attendence[0].checkIn)) / (60 * 1000);
              console.log("====checkOut====wh===", attendence[0].workedMinutes);
              attendence[0].isPresent = true
            }
            attendence[0].checkOut = req.body.checkOut;
            attendence[0].isAbsent = false     
          }
          attendence[0].save()
            .then((result) => {
              res.status(200).json({
                success: true,
                result
              })
            })
            .catch(err => {
              console.log("=====ererer========", err);
              handleCatch(err, res, 401, next)
            })
        })
        .catch(err => {
          console.log("====err=========", err);
          handleCatch(err, res, 401, next)
        })
    }

  }
  catch (err) {
    console.log("==========r========", err);
    handleCatch(err, res, 401, next)
  }
}