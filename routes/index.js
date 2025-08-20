var express = require('express');
var router = express.Router();
const sessionHandler = require("../middlewares/sessionHandler");
const users = require("../data/mockUsers");

/* GET home page. */
router.get('/', function(req, res, next) {

    // cookie setup test
    res.cookie('user', 'htunaung', {
        maxAge: 60000
    });

    console.log(req.session);
    console.log(req.session.id);
    //req.session.visited = true; // to get unique session id after init visit; this is when the session is stored

    res.status(200).json({
        sessionId: req.session.id
    })
    // res.render('index', { title: 'My Express Backend Server' });
});

router.post('/api/auth', function(req, res, next) {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username);
    if (!user || user.password !== password) return res.status(401).json({message: 'Invalid Credentials'});

    req.session.user = user; // save user to session store
    return res.status(200).json({message: 'Authentication successfully', user: user.username});

})

router.get('/api/auth/status',sessionHandler, function(req, res, next) {
        return req.session.user ?
            res.status(200).json({user: req.session.user}) :
            res.status(401).json({message: 'Not Authenticated'});
})

module.exports = router;