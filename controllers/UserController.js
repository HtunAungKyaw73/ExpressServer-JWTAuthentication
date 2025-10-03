let userService = require('../services/UserService');
// const {config} = require('../config/Config');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/httpErrorHandler');
const Users = require("../models/Users");

const registerUserHandler = async function( req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];
    let role = req.body['role'];
    let user = await userService.register(userName,password,email,role);
    // let payload = { id: user._id };
    // const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    res.status(200).json({
        message: 'New user has been registered',
        userId: user._id,
        // accessToken: accessToken
    });
}

const loginHandler = async function(req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];

    let user = await userService.login(userName,password, email);
    // console.log("User",user);
    let payload = { id: user._id };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.JWT_EXPIRES});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    user.refreshToken = refreshToken; // attach RT to user
    const result = await user.save(); // save user to DB
    console.log("RT attached to User: ",result);
    res.cookie('jwt', refreshToken, { httpOnly: true, SameSite: 'None', Secure: true, maxAge: 24 * 60 * 60 * 1000 }); // sent RT as a cookie

    res.status(200).json({
        message: 'Login successful!',
        accessToken: accessToken
    });
}

const logoutHandler = async function(req,res,next){
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(403);
    const refreshToken = cookies.jwt;
    console.log('cookies', cookies);

    const user = await Users.findOne({refreshToken});
    console.log('user',user);
    if (!user){
        res.clearCookie('jwt',{httpOnly: true, SameSite: 'None', Secure: true});
        return res.sendStatus(404);
    }
    user.refreshToken = '';
    const result = await user.save();
    console.log('Saved User',result);

    res.clearCookie('jwt',{httpOnly: true, SameSite: 'None', Secure: true});
    res.status(200).json({
        status: 'success',
        message: 'Logout successful!'
    })
}

const getUserById = async function (req, res, next) {
    console.log('Req ',req.params);
    let userId = req.params.userId;
    try {
        let user = await userService.getUserById(userId);
        // console.log(user);
        let payload = { id: user._id, username: user.username, email: user.email };
        return res.status(200).json(payload);
    }
    catch (err) {
        // console.log(err);
        res.status(404).send(err.toString());
    }
}

const updateUserHandler = async function(req, res, next) {
    let userId = req.params.userId;
    let user = req.body;
    const updateUser = await userService.updateUser(userId, user);
    res.status(200).json({
        status: 'success',
        data: updateUser,
    })
}

const deleteUserHandler = async function(req, res, next) {
    let userId = req.params.userId;
    let user = await userService.deleteUser(userId);
    res.status(200).json({
        status: 'success',
        data: user,
    })
}

const getAllUsersHandler = async function(req, res, next) {
    const users = await  userService.getAllUsers();
    res.status(200).json({
        status: 'success',
        data: users,
    })
}

const registerUser = async (req, res, next) => await errorHandler.httpErrorHandler(registerUserHandler,500)(req, res, next);
const logout = async (req, res, next) => await errorHandler.httpErrorHandler(logoutHandler,500)(req, res, next);
const login = async (req, res, next) => await errorHandler.httpErrorHandler(loginHandler,401)(req, res, next);
const getAllUsers = async (req, res, next) => await errorHandler.httpErrorHandler(getAllUsersHandler, 500)(req, res, next);
const updateUser = async (req, res, next) => await errorHandler.httpErrorHandler(updateUserHandler, 404)(req, res, next);
const deleteUser = async (req, res, next) => await errorHandler.httpErrorHandler(deleteUserHandler, 404)(req, res, next);

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    login,
    logout,
    updateUser,
    deleteUser,
}