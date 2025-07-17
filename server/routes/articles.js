const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');
const { articleUpload } = require('../middlewares/upload');

router.get('/article', articlesController.getArticles);
router.get('/article/most-viewed', articlesController.getArticleMostViewed);
router.get('/article/:id', articlesController.getArticleById);
router.get('/article/:id/related', articlesController.getRelatedArticles);
router.post('/article/insert', articleUpload.single("image"), articlesController.postArticle);
router.put('/article/view/:id', articlesController.updateViewCount);
router.put('/article/update/:id', articleUpload.single("image"), articlesController.updateArticle);
router.delete('/article/delete/:id', articlesController.deleteArticle);

module.exports = router;