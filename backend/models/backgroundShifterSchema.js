import mongoose from "mongoose";

const backgroundShifterSchema = mongoose.Schema({
    imgAddress:{
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const BackGroundShifterModel = mongoose.model('backgroundShifterSchema', backgroundShifterSchema, 'BackGround Shifter Collection')