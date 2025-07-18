const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.post('/verify_email', authController.verifyEmail);
router.post('/reset_password', authController.resetPassword);

module.exports = router;