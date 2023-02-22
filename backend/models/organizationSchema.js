import mongoose from "mongoose";

//  Schema to Create Organization 

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Organization"],
        maxlength: [100, "Organization Name Can't Exceed 100 Characters"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Please Address of Organization"],
        maxlength: [100, "Organization Address Can't Exceed 100 Characters"],
        trim: true
    },
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    description: {
        type: String,
        maxlength: [200, "Organization description Can't Exceed 200 Characters"],
    },
    location: {
        type: {
            type:String,
            default:'point'
        },
        coordinates: {
            type: Array,
            required:[true, 'Please Enter the Longititude and latitude of the Organization']
        }
    },
    logo: {
        type: String,
        required: [true, 'Please Enter the Logo for the Organization']
    },
    timeZone:{
        type: String,
        required : [true , 'Please Enter the time zone for the Organization']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const OrganizationModel = mongoose.model('Organization', organizationSchema, 'Organization Collection')