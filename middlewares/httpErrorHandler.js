const {Error} = require("mongoose");

function httpErrorHandler(handler, httpCode){
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
            else
            {
                res.status(httpCode).json({
                    error: err.message,
                });
            }
        }
    }
}

module.exports = {
    httpErrorHandler,
}