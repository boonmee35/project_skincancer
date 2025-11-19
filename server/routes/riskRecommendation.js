const express = require('express');
const router = express.Router();
const riskRecommendationController = require('../controllers/riskRecommendation');

router.get('/risk-recommendations', riskRecommendationController.getRiskRecommendations);

module.exports = router;