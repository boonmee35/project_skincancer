const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysis');
const { analysisUpload } = require('../middlewares/upload');

router.get('/analysis-results', analysisController.getAnalysisResults);
router.get('/analysis-results/:user_id', analysisController.getAnalysisResultById);
router.post('/analysis-results', analysisUpload.single("image"),analysisController.postAnalysisResult);
router.delete('/analysis-results/:id', analysisController.deleteAnalysisResult);

module.exports = router;