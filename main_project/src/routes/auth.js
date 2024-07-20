const express = require('express');
const router = express.Router();

const { getAllAuthUsers, register, login, logout } = require('../controller/Auth');
const { refreshToken } = require('../controller/Refresh');


router.get('/', getAllAuthUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken);
router.get('/logout', logout);

module.exports = router;

