const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');
const { articleUpload } = require('../middlewares/upload');

const url = process.env.URL;

router.get('/article', articlesController.getArticles);
router.get('/article/most-viewed', articlesController.getArticleMostViewed);
router.get('/article/:id', articlesController.getArticleById);
router.get('/article/:id/related', articlesController.getRelatedArticles);
router.get('/article/type/:type', articlesController.getArticleByType);
// router.get('/article/protective/:type', articlesController.getProtectiveArticleByType);
router.post('/article/insert', articleUpload.single("image"), articlesController.postArticle);
router.put('/article/view/:id', articlesController.updateViewCount);
router.put('/article/update/:id', articleUpload.single("image"), articlesController.updateArticle);
router.delete('/article/delete/:id', articlesController.deleteArticle);

router.post("/article/upload", articleUpload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `${url}/uploads/articles/${req.file.filename}`;

  return res.status(200).json({ imageUrl });
});

module.exports = router;