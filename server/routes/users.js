const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');
const { profileUpload } = require('../middlewares/upload');

router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', profileUpload.single("image"), userController.updateUser);

router.put('/users/:id/updateStatus', userController.updateUserStatus);

module.exports = router;