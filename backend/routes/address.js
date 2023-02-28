import express from 'express';
import { createAddress, getAddressById, deleteAddressById ,UpdateAddressById, getAllAddressesByUserId, deleteAllAddressesByUserId } from "../controllers/address.js";

export const addressRoute = express.Router();

addressRoute.route('/address/new').post(createAddress)
addressRoute.route('/address/:id').get(getAddressById).delete(deleteAddressById).put(UpdateAddressById)
addressRoute.route('/addresses/user/:id').get(getAllAddressesByUserId).delete(deleteAllAddressesByUserId)


