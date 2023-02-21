import mongoose from "mongoose";

//  Schema to Create Organization 

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name of Product"],
        maxlength: [100, "Product Name Can't Exceed 100 Characters"],
        trim: true
    },
    address: {
        type: String,
        required: [true, "Please Enter Name of Product"],
        maxlength: [100, "Product Name Can't Exceed 100 Characters"],
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
        maxlength: [200, "Product Name Can't Exceed 100 Characters"],
    },
    location: {
        type: "Point",
        coordinates: [],
        required: [true, ' Please Enter the Lcoation of Organization']
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

export default OrganizationModel = mongoose.model('Organization', organizationSchema, 'Organization Collection')