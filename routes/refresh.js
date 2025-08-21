var express = require('express');
var router = express.Router();
const refreshTokenController = require('../controllers/RefreshTokenController');

/* GET users listing. */
router.get('/', refreshTokenController.refreshTokenHandler);

module.exports = router;
