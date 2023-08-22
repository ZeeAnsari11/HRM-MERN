const errorHandler = (err, res, next) => {

    const ErrorMessage = err?.err?.message || err?.err || err?.message ||"Internal Server Error"
    if(err?.err?.name == "CastError"){
        err.statusCode = 400;
    }
    res.status(err.statusCode || 400).json({
        succes: false,
        Message: process.env.NODE_ENV === "DEVELOPMENT" ?  err?.err?.name !== "CastError" ? ErrorMessage : `Invalid id ${err?.err?.path}` : ErrorMessage  ,
        stack: process.env.NODE_ENV === "DEVELOPMENT" ?    err?.err?.stack : {},
        EmailError: process.env.NODE_ENV === "PRODUCTION" ?  err?.err?.name === "JsonWebTokenError" ? `Invalid JWT Token` : '' : ''

    })
}
export default errorHandler