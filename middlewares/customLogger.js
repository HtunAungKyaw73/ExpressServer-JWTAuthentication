function customLogger(loggerName) {
    return function (req, res, next) {
        console.log(loggerName, "url: ", req.url);
        next()
    }
}
module.exports = customLogger;