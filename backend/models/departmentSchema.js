import mongoose from "mongoose";

const departmentSchema = () => {
    mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Branch',
            required: true,
        },
        departmentHead: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    })
}

export default departmentModel = mongoose.model('Department', departmentSchema, 'Department Collection')