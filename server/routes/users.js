const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/users', userController.getUsers);
router.put('/users/:id', userController.updateUser);

module.exports = router;