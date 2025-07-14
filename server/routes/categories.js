const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/categories', categoriesController.getCategories);
router.post('/categories/add', categoriesController.postCategory);
router.put('/categories/update/:id', categoriesController.updateCategory);
router.delete('/categories/delete/:id', categoriesController.deleteCategory);

module.exports = router;