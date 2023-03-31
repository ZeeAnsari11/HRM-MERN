import { UserModel } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({ statusCode: 400, error: "Please enter email and password." });
    }
    UserModel.findOne({ email }).select('password')
        .then((response) => {
            (!response) ? next({ statusCode: 401, error: "Invalid email or password." }) :
                response.comparePassword(password)
                    .then((resp) => {
                        (!resp) ? next({ statusCode: 401, error: "Invalid password" }) : sendToken(response, 200, res);
                    })
        })
}

export const logout = (req, res, next) => {
    const options = {
        expires: new Date(Date.now()),
        httpOnly: true,
    };
    res.cookie('token', null, options);
    res.status(200).json({
        success: true,
        message: "Logged out"
    });
}