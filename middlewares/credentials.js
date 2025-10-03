const allowedOrigins = require('./allowedOrigins');
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    // console.log("Credential: ",req.headers.origin);
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', true);
        // console.log("Credential: ",res.header);
    }
    next();
}

module.exports = credentials;