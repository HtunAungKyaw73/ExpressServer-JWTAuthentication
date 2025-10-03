var express = require('express');
var router = express.Router();
const refreshTokenController = require('../controllers/RefreshTokenController');

router.get('/' ,refreshTokenController.refreshTokenHandler); // post request is recommended

module.exports = router;
