var express = require('express');
var router = express.Router();
const usersController = require('../controllers/UserController');

/* GET users listing. */

router.post('/register', usersController.registerUser)
router.post('/login', usersController.login);
router.get('/', usersController.getAllUsers);
router.get('/:userId', usersController.getUserById);
router.put('/:userId', usersController.updateUser);
router.delete('/:userId', usersController.deleteUser);
module.exports = router;
