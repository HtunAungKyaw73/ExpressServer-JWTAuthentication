const sessionHandler = (req, res, next) => {
    console.log("session id: ",req.session.id);
    req.sessionStore.get(req.session.id, (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("Session Store",data);
    });
    if(req.session.user)
    {
        next();
    }
    else{
        return res.status(401).send('Unauthorized request');
    }
}

module.exports = sessionHandler;