import bcrypt from "bcryptjs";
import crypto from "crypto";
import { handleCatch } from "../utils/common.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

//  Schema to Create User 

const userSchema = mongoose.Schema({
    userDefinedCode: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please enter valid email'],
        trim: true,
        maxLength: [100, 'Email cannot exceeds from 100 characters'],
        // validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        unique: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [9, 'password must be at least 9 charachters.'],
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade',
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    phoneNumber: {
        type: String,
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        trim: true,
        maxLength: [20, 'Phone number cannot exceeds from 100 characters'],
        unique: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    firstName: {
        type: String,
        required: [true, 'Please enter first name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    middleName: {
        type: String,
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    lastName: {
        type: String,
        required: [true, 'Please enter last name'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z ][a-zA-Z ]+$/
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    skills: [
        {
            type: String,
            trim: true,
            maxLength: [40, 'Cannot exceeds from 40 characters'],
            validate: /^[a-zA-Z ][a-zA-Z ]+$/
        }
    ],
    roster: {
        employeeRosterDetails: [{
            day: {
                type: String
            },
            date: {
                type: Date
            },
            workingHours: {
                type: String
            },
            plannedHours: {
                type: String
            },
        }]
    },
    userRoster: {
        timeSlots: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TimeSlots',
            required: function () {
                return !this.firstUser; // Set unique to false when firstUser is true
            },
        },
        restDays: [Number],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    isLineManager: {
        type: Boolean,
        default: false
    },
    isTeamLead: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFinalAuthority: {
        type: Boolean,
        default: false
    },
    probation: {
        isOnProbation: {
            type: Boolean,
            default: false
        },
        durationOfProbation: {
            type: Number,
            min: 0,
            max: 12
        },
        completionDate: {
            type: Date
        },
        status: {
            type: String,
            default: "complete"
        }
    },
    areaBounded: {
        isBounded: {
            type: Boolean,
            default: false
        },
        addArea: {
            type: String,
            trim: true
        }
    },
    HOD: {
        isHOD: {
            type: Boolean,
            default: false
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Department'
        }
    },
    attendanceExempt: {
        type: Boolean,
        default: false
    },
    lineManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    firstUser: {
        type: Boolean,
        default: false
    },
    employeeType: {
        type: String,
        enum: {
            values: [
                'field',
                'non-field'
            ],
            messsage: 'Enter a valid Employee Type',
        },
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    employmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employment',
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    roleType: {
        type: String,
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        lowercase: true,
        enum: {
            values: [
                'admin',
                'user',
                'manager'
            ],
            messsage: 'Please Enter Action Type'
        }
    },
    timeZone: {
        type: Date,
        default: Date.now
    },
    joiningDate: { 
        type: Date,
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    EOE: {
        details: [{
            eoeType: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'EOEType',
                required: true,
            },
            data: {
                resignationDate: {
                    type: Date,
                    required: true,
                },
                noticePeriod: {
                    type: Boolean,
                    default: false,
                },
                lastWorkingDate: {
                    type: Date,
                    default: Date.now,
                },
                attachment: {
                    type: String
                },
                reason: {
                    type: String,
                    trim: true,
                    required: true,
                }
            }

        }]
    },
    profile: {
        type: String
    },
    rehire: {
        type: [{
            date: {
                type: Date,
                default: Date.now
            },
            reason: {
                type: String,
                trim: true,
                required: true
            }
        }]
    },
    religion: {
        type: String,
        trim: true,
        maxLength: [70, 'Cannot exceeds from 70 characters'],
        //validate: /^[a-zA-Z]+$/
    },
    nationality: {
        type: String,
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        //validate: /^[a-zA-Z]+$/
    },
    bloodGroup: {
        type: String,
        trim: true,
        enum: [
            'A+',
            'A-',
            'B+',
            'B-',
            'AB+',
            'AB-',
            'O+',
            'O-'
        ]
    },
    personalEmail: {
        type: String,
        required: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        //validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        unique: function () {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
        lowercase: true,
    },
    nic: {
        number: {
            type: String,
            required: function () {
                return !this.firstUser; // Set unique to false when firstUser is true
            },
            trim: true,
            //validate: /^[0-9]+$/
            unique: function () {
                return !this.firstUser; // Set unique to false when firstUser is true
            },
        },
        attachment: {
            front: {
                type: String,
                function() {
                    return !this.firstUser; // Set unique to false when firstUser is true
                },
            },
            back: {
                type: String,
                function() {
                    return !this.firstUser; // Set unique to false when firstUser is true
                },
            }
        },
        expiry: {
            type: Date,
            function() {
                return !this.firstUser; // Set unique to false when firstUser is true
            },
        }
    },
    passport: {
        number: {
            type: String,
            trim: true,
            //validate: /^[0-9]+$/
            unique: function () {
                return !this.firstUser; // Set unique to false when firstUser is true
            },
        },
        attachment: {
            type: String,
        },
        expiry: {
            type: Date,
        }
    },
    drivingLiscence: {
        number: {
            type: String,
            trim: true,
            validate: /^[0-9]+$/,
            unique: function () {
                return !this.firstUser; // Set unique to false when firstUser is true
            }
        },
        attachment: {
            type: String,
        },
        expiry: {
            type: Date,
        },
        required: false,
        default: {}
    },
    leaveTypeDetails: [{
        leaveType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LeaveType'
        },
        count: {
            type: Number
        }
    }],
    grossSalary: {
        type: Number,
        function() {
            return !this.firstUser; // Set unique to false when firstUser is true
        },
    },
    temporaryAddress: {
        type: String,
    },
    permanentAddress: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(timeZone, { paths: ['timeZone'] });

// userSchema.pre('save', async function (next) {
//     try {
//         var user = this;
//         if (user.firstUser) {
//             userSchema.eachPath((path, schemaType) => {
//                 schemaType.validators = [];
//             });
//         }
//         if (!user.isModified('password')) return next();

//         bcrypt.genSalt(10, function (err, salt) {
//             if (err) {
//                 throw err = new Error(err);
//                 err.statusCode = 400;
//                 throw err;
//             }
//             bcrypt.hash(user.password, salt, function (err, hash) {
//                 if (err) {
//                     throw err = new Error(err);
//                     err.statusCode = 400;
//                     throw err;
//                 }
//                 user.password = hash;
//                 next();
//             });
//         });
//     } catch (err) {
//         handleCatch(err, res, err.statusCode || 400, next)
//     }
// });

userSchema.pre('save', function (next) {
    try {
        var user = this;
        if (user.firstUser) {
            userSchema.eachPath((path, schemaType) => {
                schemaType.validators = [];
            });
        }
        if (!user.isModified('password')) return next();

        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                let err = new Error(err);
                err.statusCode = 400;
                throw err;
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    let err = new Error(err);
                    err.statusCode = 400;
                    throw err;
                }
                user.password = hash;
                next();
            });
        });
    }
    catch (err) {
        handleCatch(err, res, err.statusCode || 400, next)
    }
})

userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}

userSchema.methods.comparePassword = function (password) {
    console.log("======response===2=", password);
    return bcrypt.compare(password, this.password)
}

userSchema.methods.getResetPasswordToken = function () {
    let user = this;
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + (30 * 60 * 1000);
    return resetToken

}

export const UserModel = mongoose.model('User', userSchema, 'User Collection')