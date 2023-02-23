import mongoose from "mongoose";

//  Schema to Create Department 

const departmentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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

