import mongoose from "mongoose";

const addressSchema = mongoose.Schema({
    address_type: {
        type: String,
        required: [true, "Please Select Address Type"],
        enum: {
            values: [
                'Permanent',
                'Present',
            ],
            messsage: 'Please Select Address Type'
        }
    },
    address : {
        type : String,
        required : [true , "Please Enter Your Address"]
    },
    country: {
        type : String,
        required : [true , "Please Enter the Country"]
    },
    city: {
        type : String,
        required : [true , "Please Enter the City"]
    },
    province : {
        type : String,
        required : [true , "Please Enter the Province"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : [true,  "Please Enter the UserId"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const AddressModel = mongoose.model('Address', addressSchema, 'Address Collection');