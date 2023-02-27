import { BankModel } from "../models/bankSchema.js";
import { OrganizationModel } from "../models/organizationSchema.js";
import { UserModel } from "../models/userSchema.js";
import { createNew, deleteInBulk, updateById, getAll, deleteById } from "../utils/common.js"

export const createBank= (req, res, next)=>{
    OrganizationModel.findById(req.body.organization)
    .then((organization)=>{
        if(!organization) throw 'Organization do not exist'
        UserModel.findById(req.body.user)
        .then((user)=>{
            if(!user) throw "User Not Found"
            if(user.organization.toString() !== organization._id.toString()) throw "User not belong to that organization"
            createNew(req,res,next, BankModel)
        })
        .catch((err)=>{
            res.status(404).json({
                success: false,
                error: err
            })
        })

    })
    .catch((err)=>{
        res.status(404).json({
            success: false,
            error: err
        })
    })
}

export const getBanksByUserId = (req, res, next)=>{
   getAll(res, next, BankModel, {user: req.params.id},'Bank')
}


export const updateBankById = (req, res, next)=>{
    try{
        if(req.body.organization || req.body.user) throw "You can not update organization or user of a Bank Account"
        updateById(req, res, next, BankModel, "Bank Details")
    }
    catch(err){
        res.status(404).json({
            success: false,
            error: err
        })
    }
}

export const deleteBanksByUserId = (req, res, next)=>{
    deleteInBulk(res, next, BankModel,{user:req.params.id} , "Bank")
}

export const deleteBankById = ()=>{
    deleteById(req.params.id, res, next, BankModel, "Bank")
}