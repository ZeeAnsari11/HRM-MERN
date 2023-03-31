export const sendToken = (user, statusCode, res) => {
    const jwtToken = user.getJwtToken();
    const options = {
        expires: new Date( Date.now() + process.env.COOKIE_EXPIRE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    res.status(statusCode)
    .cookie('token',jwtToken,options)
    .json({
        success: true,
        token: jwtToken,
        user
    })
}