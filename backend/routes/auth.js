const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Đảm bảo rằng endpoint này tồn tại và đúng URL
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

module.exports = router;
