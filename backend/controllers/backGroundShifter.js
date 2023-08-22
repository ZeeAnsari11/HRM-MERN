import { createNew, getAll } from "../utils/common.js"

import { BackGroundShifterModel } from "../models/backgroundShifterSchema.js"
import fs from 'fs'

export const createShifterImg = (req, res, next)=>{
    createNew(req, res, next,  BackGroundShifterModel)
}

export const getAllBG_Shifters = (req, res, next)=>{
   getAll(res, next,BackGroundShifterModel, {}, "Back Ground Shifters")
}

export const deleteBG_ShiftersByName = (req, res, next)=>{
    fs.unlink(req.body.name, err => {
        if (err) {
            res.status(404).json({
                success : false,
                error : err
            })
        }
        else{
            res.status(200).json({
                success : true,
                Message : "Successfully deleted the BG-Shifter"
            })
        }
    })
 }

 