const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment');

router.get('/forum/posts/:id/comments', commentController.getCommentsByPostId);
router.post('/forum/posts/:id/comments', commentController.createComment);

router.post('/forum/posts/comments/report/:id', commentController.reportComment);
router.get('/forum/posts/comments/reported', commentController.getCommentReport);
router.get('/forum/posts/comments/reported/comment/:id', commentController.getReportedCommentById);
router.get('/forum/posts/comments/reported/:id', commentController.getReportedCommentByUserId);

router.put('/forum/posts/comments/report/:id/action', commentController.manageReportedComments);

module.exports = router;