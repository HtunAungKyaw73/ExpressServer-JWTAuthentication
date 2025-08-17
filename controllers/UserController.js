let userService = require('../services/UserService');
const {config} = require('../config/Config');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/httpErrorHandler');

const registerUser = async function( req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    let email = req.body['email'];
    try
    {
        let user = await userService.register(userName,password,email);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: '30s'});
        res.status(200).json({
            message: 'New user has been registered',
            userId: user._id,
            token: token
        });
    }
    catch (err) {
        console.log(err.errmsg);
        if (err.errmsg.split(" ")[0] === 'E11000') {
            return res.status(401).json({
                message: 'Username already taken. Please user another username.'
            });
        }
        res.status(400).json({message:"User already existed"});
    }
}
const login = async function(req,res,next)
{
    let userName = req.body['username'];
    let password = req.body['password'];
    // let email = req.body['email'];
    try
    {
        let user = await userService.login(userName,password);
        // console.log("User",user);
        let payload = { id: user._id };
        const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: '30s'});
        res.status(200).json({
            message: 'Login successful!',
            userId: user._id,
            token: token
        });
    }
    catch (err) {
        console.log(err)
        res.status(401).send({message:"Invalid user"});
    }
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

const getAllUsers = async (req, res, next) => await errorHandler.httpErrorHandler(getAllUsersHandler, 500)(req, res, next);
const updateUser = async (req, res, next) => await errorHandler.httpErrorHandler(updateUserHandler, 404)(req, res, next);
const deleteUser = async (req, res, next) => await errorHandler.httpErrorHandler(deleteUserHandler, 404)(req, res, next);

module.exports = {
    getAllUsers,
    getUserById,
    registerUser,
    login,
    updateUser,
    deleteUser,
}