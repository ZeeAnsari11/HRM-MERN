import mongoose from "mongoose";

//  Schema to Create Department 

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name of the department'],
        trim: true,
        maxLength: [100, 'Cannot exceeds from 100 characters']
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    departmentHead: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export const DepartmentModel = mongoose.model('Department', departmentSchema, 'Department Collection')

