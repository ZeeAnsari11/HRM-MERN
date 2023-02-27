import mongoose from "mongoose";

const bankSchema = mongoose.Schema({
    organization : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization'
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bankName : {
        type :String,
        require : [true, 'Please Enter the Name of Bank'],
        trim: true
    },
    bankCode : {
        type :Number,
        require : [true, 'Please Enter the Bank Code'],
    },
    branchName : {
        type :String,
        require : [true, 'Please Enter the Bank Name'],
        trim: true,
    },
    branchCode : {
        type :Number,
        require : [true, 'Please Enter the Branch Code'],
    },
    accNumber : {
        type :Number,
        require : [true, 'Please Enter the Account Number'],
    },
    IBAN_Number : {
        type :Number,
    },
    accTitle : {
        type :String,
        required:[true, "please Enter the Account Title"]
    },
    accType : {
        type :String,
        required:[true, "please Enter the Account Type"]
    }

})

export const BankModel = mongoose.model('Bank', bankSchema, 'Bank Collection');