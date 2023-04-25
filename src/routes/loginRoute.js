const express = require('express');

const router = express.Router();

const loginControllers = require('../controllers/loginControllers');

const checkEmailAndPassword = require('../middlewares/checkEmailAndPassword');

router.post('/', checkEmailAndPassword, loginControllers.generateToken);

module.exports = router;