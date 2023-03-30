const errorHandler = (err, req, res, next) => {
    let errStatusCode = err.statusCode || 500;
    let errMsg = err.error.message || err.error || 'Something went wrong';
    let stack = err.error.stack | {}
    
    if (process.env.NODE_ENV === 'production') {
        stack = {};
        if (err.error.code === 11000) {
            errMsg = "Duplicate Email Entered.";
        }
        if (err.error.name === 'CastError') {
            errMsg = "Error: Resource Not found : Invalid ID";
            errStatusCode = 404;
        }
        if (err.error.name === 'JsonWebTokenError') {
            errMsg = "Json Web Token is invalid.";
        }
    }
    res.status(errStatusCode).json({
        success: false,
        status: errStatusCode,
        message: errMsg,
        stack: stack,
    })
}
export default errorHandler