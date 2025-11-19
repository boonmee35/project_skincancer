const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/summary', dashboardController.getSummary);
router.get('/count-report', dashboardController.getCountReport);
router.get('/risk-distribution', dashboardController.getRiskDistribution);
router.get('/highrisk-count', dashboardController.getHighRiskCounts);
router.get('/analysis-count', dashboardController.getAnalysisCountTrend);
router.get('/latest-analyses', dashboardController.getLatestAnalyses);

module.exports = router;