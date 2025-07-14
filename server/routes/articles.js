const express = require('express');
const router = express.Router();
const articlesController = require('../controllers/articles');
const upload = require('../middlewares/upload');

router.get('/article', articlesController.getArticles);
router.get('/article/most-viewed', articlesController.getArticleMostViewed);
router.get('/article/:id', articlesController.getArticleById);
router.post('/article/insert', upload.single("image"), articlesController.postArticle);
router.put('/article/view/:id', articlesController.updateViewCount);
router.put('/article/update/:id', upload.single("image"), articlesController.updateArticle);
router.delete('/article/delete/:id', articlesController.deleteArticle);

module.exports = router;