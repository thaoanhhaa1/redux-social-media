const express = require('express');
const sitesController = require('../app/controllers/sitesController');

const router = express.Router();

router.get('/search/:search', sitesController.search);
router.get('/gifs/search', sitesController.gifs);

module.exports = router;
