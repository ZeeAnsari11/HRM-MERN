import { UserModel } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/emailManager.js";
import crypto from "crypto";
import { handleCatch } from "../utils/common.js";

export const login = (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            let InvalidCrendentials = new Error("Please enter email and password.")
            InvalidCrendentials.statusCode = 400
            throw InvalidCrendentials;
        }
        UserModel.findOne({ email }).select('password')
            .then((response) => {
                if (!response) {
                    let notFound = new Error("Invalid email or password.")
                    notFound.statusCode = 401
                    throw notFound
                } else {
                    response.comparePassword(password)
                        .then((resp) => {
                            if (!resp) {
                                let InvalidPassword = new Error("Invalid password.")
                                InvalidPassword.statusCode = 401
                                throw InvalidPassword
                            } else {
                                sendToken(response, 200, res)
                            }
                        })
                        .catch((err) => {
                            handleCatch(err, res, err.statusCode || 404, next)
                        });
                }
            })
            .catch((err) => {
                handleCatch(err, res, err.statusCode || 404, next)
            });
    }
    catch (err) { handleCatch(err, res, err.statusCode || 400, next) }
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
                let NoSuchEmail = new Error("No such email exists.")
                NoSuchEmail.statusCode = 404
                throw NoSuchEmail
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
                                handleCatch(error, res, 500, next)
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
        if (!user) {
            let sessionExpired = new Error("Password reset failed! Session expired.");
            sessionExpired.statusCode = 400;
            throw sessionExpired;
        }
        if (req.body.password !== req.body.comfirmpassword) {
            let passNotMatched = new Error("Passwords doesn't match.");
            passNotMatched.statusCode = 400;
            throw passNotMatched
        }
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        user.save({ validateBeforeSave: true })
            .then(() => {
                sendToken(user, 200, res);
            })
            .catch((error) => handleCatch(error, res, error.statusCode || 400, next))
    })
        .catch((error) => handleCatch(error, res, error.statusCode || 400, next))

}

export const changeUserPassword = (req, res, next) => {
    UserModel.findById(req.user.id).select('+password')
        .then((user) => {
            user.comparePassword(req.body.password)
                .then((pswd) => {
                    if (pswd) {
                        let samePassword = new Error("New password can;t be same as previous password.")
                        samePassword.statusCode = 409;
                        throw samePassword;
                    }
                    user.comparePassword(req.body.oldPassword)
                        .then((isMatched) => {
                            if (!isMatched) {
                                let oldPasswordInvalid = new Error("Old password entered is incorrect.")
                                oldPasswordInvalid.statusCode = 400;
                                throw oldPasswordInvalid;
                            }
                            user.password = req.body.password;
                            user.save()
                                .then(() => {
                                    res.status(200).json({
                                        success: 200,
                                        message: "Password updated successfully."
                                    })
                                    sendToken(user, 200, res);
                                })
                                .catch((err) => { throw new Error(err) })
                        })
                })
        })
        .catch((error) => handleCatch(error, res, error.statusCode || 400, next))
}