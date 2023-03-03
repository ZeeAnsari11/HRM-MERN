import mongoose from "mongoose";

//  Schema to Create Organization 

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        validate: /^[a-zA-Z ][a-zA-Z ]+$/,
        required: [true, "Please Enter Name of Organization"],
        maxlength: [100, "Organization Name Can't Exceed 100 Characters"],
        trim: true,
        unique : true
    },
    start: {
        type: Date,
        default : Date.now
    },
    description: {
        type: String,
        maxlength: [200, "Organization description Can't Exceed 200 Characters"],
    }, 
    logo: {
        type: String,
        required: [true, 'Please Enter the Logo for the Organization']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const OrganizationModel = mongoose.model('Organization', organizationSchema, 'Organization Collection')