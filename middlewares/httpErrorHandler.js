const {Error} = require("mongoose");

function httpErrorHandler(handler, errorCode){
    return async (req, res, next) => {
        try{
            await handler(req, res, next);
        }
        catch(err){
            if(err instanceof Error.ValidationError)
            {
                res.status(400).json({
                    error: err.message,
                });
            }
            else if (err.message.split(" ")[0] === 'E11000' && err.toString().includes('username')) {
                return res.status(400).json({
                    message: 'Username already taken. Please user another username.'
                });
            }
            else if (err.message.split(" ")[0] === 'E11000' &&  err.toString().includes('email')) {
                return res.status(400).json({
                    message: 'There is already a user with this email.'
                });
            }
            else
            {
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