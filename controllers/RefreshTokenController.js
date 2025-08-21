const Users = require('../models/Users');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/httpErrorHandler');

const refreshTokenGenerator = async function (req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    console.log('cookies', cookies);

    const user = await Users.findOne({refreshToken});
    console.log('user',user);
    if (!user) return res.sendStatus(404);

    const {id} = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    console.log('id', id);
    if (!id) return res.sendStatus(401);
    const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES });
    return res.status(200).json({status: 'success', message: 'new access token created' ,accessToken: accessToken});
}

const refreshTokenHandler = async (req, res, next) => errorHandler.httpErrorHandler(refreshTokenGenerator, 401)(req, res, next);

module.exports = {refreshTokenHandler};