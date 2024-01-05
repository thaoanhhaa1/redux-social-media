const express = require('express');
const router = express.Router();

const bookmarksController = require('../app/controllers/bookmarksController');

router.get('/', bookmarksController.getAll);

module.exports = router;
