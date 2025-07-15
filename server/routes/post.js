const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { postUpload } = require('../middlewares/upload');

router.get('/forum/posts', postController.getPosts);
router.post('/forum/posts', postUpload.single("image"), postController.createPost);

module.exports = router;