import mongoose from "mongoose";
import timeZone from "mongoose-timezone";

//  Schema to Create User 

const userSchema = mongoose.Schema({
    userDefinedCode: {
        type: String
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
        ref: 'User'
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
        enum: {
            values: [
                'Admin',
                'Manager',
                'Employee'
            ],
            messsage: 'Enter a valid Role Type',
        },
        required: [true, "Select Role Type"],
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
        validate: /^[a-zA-Z]+$/
    },
    nationality: {
        type: String,
        required: [true, 'Please enter your nationality'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters'],
        validate: /^[a-zA-Z]+$/
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
        validate: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
        unique: [true, 'Email already in use']
    },
    nic: {
        number: {
            type: String,
            required: [true, 'Please enter your CNIC without dashes'],
            trim: true,
            validate: /^[0-9]+$/,
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
            validate: /^[0-9]+$/,
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
            unique: [true, 'Driving Lisence already in use']
        },
        attachment: {
            type: String,
        },
        expiry: {
            type: Date,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(timeZone, { paths: ['timeZone'] });
export const UserModel = mongoose.model('User', userSchema, 'User Collection')