import mongoose from "mongoose";
import timeZone from "mongoose-timezone";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";


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
        unique: [true, 'Email already in use']
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
        required: true,
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
        required: true,
    },
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Designation',
        required: true,
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
            required: true
        },
        restDays: [Number],
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
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
        required: [true, "Select Employee Type"],
    },
    employmentType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employment',
        required: true,
    },
    roleType: {
        type: String,
        required: [true, 'please Enter the User Role'],
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
        required: true
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
        required: [true, 'Please enter your nationality'],
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
        required: [true, 'Please enter your personal email'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        //validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
        unique: [true, 'Email already in use']
    },
    nic: {
        number: {
            type: String,
            required: [true, 'Please enter your CNIC without dashes'],
            trim: true,
            //validate: /^[0-9]+$/
            unique: [true, 'CNIC already in use']
        },
        attachment: {
            front: {
                type: String,
                required: [true, 'Please enter your cnic front attachment']
            },
            back: {
                type: String,
                required: [true, 'Please enter your cnic back attachment']
            }
        },
        expiry: {
            type: Date,
            required: [true, 'Please enter your cnic expiry date']
        }
    },
    passport: {
        number: {
            type: String,
            trim: true,
            //validate: /^[0-9]+$/
            unique: [true, 'Passport already in use']
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
            unique: [true, 'Driving Lisence already in use'],
            
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(timeZone, { paths: ['timeZone'] });

userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next({ error: err, statusCode: 404 });
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next({ error: err, statusCode: 404 });
            user.password = hash;
            next();
        });
    });
})


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_TIME })
}

userSchema.methods.comparePassword = function (password) {
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