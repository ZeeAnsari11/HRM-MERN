import { OrganizationModel } from '../models/organizationSchema.js';
import { UserModel } from '../models/userSchema.js'
import moment from "moment";
import { AttendanceModel } from "../models/attendanceSchema.js";
import { createNew, getAll, getById, handleCatch } from '../utils/common.js';

export const createCompanyHoliday = (req, res, next) => {
    try {
        if (!req.body.date) throw 'Kindly Provide date(s) for holiday.'
        let count = 0;
        OrganizationModel.findById(req.params.id)
            .then((organization) => {
                if (!organization) throw 'No Such Organization.'
                return UserModel.find({ organization: organization._id })
            })
            .then((users) => {
                console.log("users", users);
                if (users.length == 0) throw 'No User in the given organization.'
                req.body.date.forEach(date => {
                    count = count + 1;
                    const momemtDate = moment(date, 'YYYY-MM-DD');
                    const index = new Date(date);
                    const dayIndex = index.getDay();
                    users.forEach(user => {
                        if (!(user.userRoster.restDays.includes(dayIndex))) {
                            if(AttendanceModel.find({}))
                            AttendanceModel.create({ user, date: momemtDate.format('YYYY-MM-DD'), isAbsent: true, onLeave: "public-holiday" })
                            if(req.body.date.length == count){
                                res.status(200).json({
                                    success: true,
                                    message: "Public Holiday Created."
                                  })
                            }
                        }
                    })
                })
            })
            .catch((error) => {
                console.log(error);
            })
    } catch (error) {
        handleCatch(error, res, 401, next)
    }
}