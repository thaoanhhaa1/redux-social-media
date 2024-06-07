const express = require('express');

const router = express.Router();

const trendingController = require('../app/controllers/trendingController');

router.get('/:type/count', trendingController.countPages);
router.get('/:type/:id', trendingController.getByTrending);
router.get('/:type', trendingController.getTrending);

module.exports = router;
