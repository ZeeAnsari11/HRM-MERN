import { UserModel } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/emailManager.js";
import crypto from "crypto";

export const login = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        next({ statusCode: 400, error: "Please enter email and password." });
    }
    UserModel.findOne({ email }).select('password')
        .then((response) => {
            (!response) ? next({ error: "Invalid email or password." ,statusCode: 401,}) :
                response.comparePassword(password)
                    .then((resp) => {
                        (!resp) ? next({ error: "Invalid password",statusCode: 401, }) : sendToken(response, 200, res);
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

export const forgotPassword = (req, res, next) => {
    UserModel.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return next({ error: 'No such email exists.', statusCode: 404 })
            }
            const resetToken = user.getResetPasswordToken(user);
            user.save({ validateBeforeSave: false })
                .then(() => {
                    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
                    const resetPswdEmail = `Trouble signing in? Resetting your password is easy. Just click on the link below and follow the instructions. Link[${resetUrl}] We'll have you up and running in no time. If you did not make this request then please ignore this email.`;
                    try {
                        sendEmail({
                            email: user.email,
                            subject: "HRMS Password Recovery",
                            resetPswdEmail
                        }, res, next)
                    } catch (error) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpire = undefined;
                        user.save({ validateBeforeSave: false })
                            .then(() => {
                                return next({ error: error, statusCode: 500 });
                            })
                    }
                })
        })
}

export const resetPassword = (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    UserModel.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    }).then((user) => {
        if (!user) return next({ statusCode: 400, error: "Password reset failed! Session expired." });
        if (req.body.password !== req.body.comfirmpassword) return next({ statusCode: 400, error: "Passwords doesn't match." });
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforeSave: true })
            .then(() => {
                sendToken(user, 200, res);
            })
            .catch((error) => next({ statusCode: 400, error: error }))
    })
        .catch((error) => next({ statusCode: 400, error: error }))

}

export const changeUserPassword = (req, res, next) => {
    UserModel.findById(req.user.id).select('+password')
    .then((user) => {
        user.comparePassword(req.body.password)
        .then((pswd) => {
            if (pswd) return next({statusCode:400, error:"New password can;t be same as previous password."})
            user.comparePassword(req.body.oldPassword)
            .then((isMatched) => {
                if (!isMatched) return next({statusCode:400, error:"Old password entered is incorrect."})
                user.password = req.body.password;
                user.save()
                .then(() => {
                    res.status(200).json({
                        success: 200,
                        message: "Password updated successfully."
                    })
                    sendToken(user, 200, res);
                })
                .catch((err)=>{throw err})
            })
        })
    })
    .catch((error) => next({statusCode:400, error:error}))
}