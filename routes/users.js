var express = require('express');
var router = express.Router();
const usersController = require('../controllers/UserController');
let auth = require('../middlewares/auth');
let loginLimiter = require('../middlewares/loginLimiter');

router.post('/register', usersController.registerUser)
router.post('/login', loginLimiter ,usersController.login);
router.post('/logout', auth.verifyUserToken ,usersController.logout);
router.get('/', auth.verifyUserToken ,usersController.getAllUsers);
router.get('/:userId', auth.verifyUserToken, usersController.getUserById);
router.put('/:userId', auth.verifyUserToken, usersController.updateUser);
router.delete('/:userId', auth.verifyUserToken, usersController.deleteUser);
module.exports = router;