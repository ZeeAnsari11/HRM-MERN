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
        ref: 'User',
        required: true
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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.plugin(timeZone, { paths: ['timeZone'] });
export const UserModel = mongoose.model('User', userSchema, 'User Collection')