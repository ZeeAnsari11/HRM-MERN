import { UserModel } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import { handleCatch } from "../utils/common.js";

export const isAuthenticatedUser = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            let UnAuthorized = new Error("UnAuthorized user : login to access resource.")
            UnAuthorized.statusCode = 400
            throw UnAuthorized;
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
                    else {
                        let UnAuthorized = new Error("UnAuthorized user : login to access resource.")
                        UnAuthorized.statusCode = 400
                        throw UnAuthorized;
                    }
                })

        }
    }
    catch (err) { handleCatch(err, res, err.statusCode || 400, next) }
}
