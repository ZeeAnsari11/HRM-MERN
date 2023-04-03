import { UserModel } from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = (req, res, next) => {
    const {token} = req.cookies;
    if (!token) {
        next({error:"UnAuthorized user : login to access resource.", statusCode:401})
    }
    else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        UserModel.findById(decoded.id)
        .then((response) => {
            if (response) {
                req.user = response;
                next();
            }
            else next({statusCode:404, error:"Error : Un-Authorized user."})
        })

    }
}
