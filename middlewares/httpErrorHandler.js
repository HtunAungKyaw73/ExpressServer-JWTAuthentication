const {Error} = require("mongoose");
const {logEvents} = require("./customLogger");

function httpErrorHandler(handler, errorCode){
    return async (req, res, next) => {
        try{
            await handler(req, res, next);
        }
        catch(err){
            if(err instanceof Error.ValidationError)
            {
                logEvents(`${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log');
                res.status(400).json({
                    error: err.message,
                });
            }
            else if (err.message.split(" ")[0] === 'E11000' && err.toString().includes('username')) {
                logEvents(`${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log');
                return res.status(400).json({
                    message: 'Username already taken. Please user another username.'
                });
            }
            else if (err.message.split(" ")[0] === 'E11000' &&  err.toString().includes('email')) {
                logEvents(`${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log');
                return res.status(400).json({
                    message: 'There is already a user with this email.'
                });
            }
            else
            {
                logEvents(`${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,'errLog.log');
                res.status(errorCode).json({
                    error: err.message,
                });
            }
        }
    }
}

module.exports = {
    httpErrorHandler,
}