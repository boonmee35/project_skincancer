const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
const { postUpload } = require('../middlewares/upload');

const url = process.env.URL;

router.get('/forum/posts', postController.getPosts);
router.get('/forum/posts/reported', postController.getReportedPosts);
router.get('/forum/posts/reported/:id', postController.getReportedPostByUserId);
router.get('/forum/posts/reported/post/:id', postController.getReportedPostByID);
router.get('/forum/posts/:id', postController.getPostById);
router.get('/forum/posts/history/:user_id', postController.postHistory);

router.post('/forum/posts', postUpload.single("image"), postController.createPost);
router.put('/forum/posts/:id', postUpload.single("image"), postController.updatePost);
router.delete('/forum/posts/:id', postController.deletePost);

router.post('/forum/posts/:id/report', postController.reportPost);
router.put('/forum/posts/report/:id/action', postController.manageReportedPosts);

router.post("/post/upload", postUpload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `${url}/uploads/posts/${req.file.filename}`;

  return res.status(200).json({ imageUrl });
});

module.exports = router;