import { AddressModel } from "../models/addressSchema.js";
import { UserModel } from "../models/userSchema.js";
import { checkIsExistAndCreate, getById, deleteById, getAll, deleteInBulk, updateById } from "../utils/common.js";


export const createAddress = (req, res, next) => {
    checkIsExistAndCreate(req, res, next, req.body.user, UserModel, AddressModel, 'User')
}

export const getAddressById = (req, res, next) => {
    getById(req.params.id, res, next, AddressModel, "Address")
}

export const deleteAddressById = (req, res, next) => {
    deleteById(req.params.id, res, next, AddressModel, "Address")
}

export const UpdateAddressById = (req, res, next) => {
    try {
        if (req.body.user) throw "You can not update the user of an Address";
        updateById(req, res,next , AddressModel, "Addresss")
    }
    catch (err)  { handleCatch(err, res, 401, next) }
}

export const getAllAddressesByUserId = (req, res, next) => {
    getAll(res, next, AddressModel, {user : req.params.id}, "Address's");
}

export const deleteAllAddressesByUserId = (req, res, next) => {
    deleteInBulk(res, next, AddressModel, {user: req.params.id}, "Address's")
}