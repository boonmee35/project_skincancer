const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { postUpload } = require('../middlewares/upload');

router.get('/forum/posts', postController.getPosts);
router.get('/forum/posts/:id', postController.getPostById);
router.post('/forum/posts', postUpload.single("image"), postController.createPost);

router.get('/forum/posts/:id/comments', postController.getCommentsByPostId);
router.post('/forum/posts/:id/comments', postController.createComment);

module.exports = router;